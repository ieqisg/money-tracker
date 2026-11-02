"""CPU-only receipt OCR postprocessor. Python standard library only."""
import json, re, sys
from pathlib import Path
from datetime import datetime

MONEY = re.compile(r'(?<![\w.])(?:[$₱€£]\s*)?(\d{1,3}(?:,\d{3})+|\d+)\.\d{2}(?!\d)')
DATE = re.compile(r'(?<!\d)(\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{2,4})(?!\d)')
TIME = re.compile(r'(?<!\d)((?:[01]?\d|2[0-3]):[0-5]\d(?::[0-5]\d)?\s*(?:AM|PM)?)(?!\d)', re.I)
TOTAL = re.compile(r'^\s*(?:GRAND\s+TOTAL|TOTAL\s+DUE|AMOUNT\s+DUE|BALANCE\s+DUE|TOTAL)\s*[:\-]?\s*', re.I)
EXCLUDE = re.compile(r'\b(?:SUB\s*T[O0]TAL|SAVINGS?|TOTAL\s+(?:TAX|ITEMS|SAVINGS|NUMBER)|ITEMS?\s+SOLD|CHANGE\s+DUE|TOTAL\s+PURCHASES?)\b', re.I)

def money_values(text):
    return [float(m.group(0).replace(',', '').replace('$', '').replace('₱', '').replace('€', '').replace('£', '').strip()) for m in MONEY.finditer(text)]

def parse_date(text, date_order=None):
    """Return (date_string, confidence, warning) or None. date_order: MDY/DMY."""
    for m in DATE.finditer(text):
        raw = m.group(1)
        sep = '/' if '/' in raw else '-'
        a,b,c = raw.split(sep)
        try:
            if len(a)==4:
                dt=datetime(int(a),int(b),int(c)); return dt.strftime('%Y-%m-%d'), 'high', None
            if len(c) not in (2,4): continue
            year=int(c) if len(c)==4 else (2000+int(c) if int(c)<=68 else 1900+int(c))
            first,second=int(a),int(b)
            if first>12 and second<=12: day,month=first,second
            elif second>12 and first<=12: month,day=first,second
            elif date_order=='DMY': day,month=first,second
            elif date_order=='MDY': month,day=first,second
            else:
                # Do not silently reinterpret ambiguous numeric dates.
                datetime(year,first,second)
                datetime(year,second,first)
                return raw, 'low', 'ambiguous_date_order'
            dt=datetime(year,month,day)
            return dt.strftime('%Y-%m-%d'), 'high', None
        except ValueError:
            continue
    return None

def valid_time(text):
    for m in TIME.finditer(text):
        s=m.group(1).strip()
        try:
            has_ampm=bool(re.search(r'\b(?:AM|PM)$',s,re.I))
            t=s.upper().replace(' ','')
            fmt=('%I:%M:%S%p' if t.count(':')==2 else '%I:%M%p') if has_ampm else ('%H:%M:%S' if t.count(':')==2 else '%H:%M')
            datetime.strptime(t,fmt)
            return s
        except ValueError:
            continue
    return None

def bbox(item):
    b=item.get('bbox')
    return b if isinstance(b,list) and len(b)==4 else None

def extract(data, date_order=None):
    items=data.get('ocr_info',[])
    result={k:None for k in ('merchant','date','time','total')}
    sources={}; confidence={}; warnings=[]
    def set_field(field,value,source,level='medium'):
        result[field]=value; sources[field]=source; confidence[field]=level

    for item in items:
        text=item.get('transcription','').strip(); label=item.get('pred','').upper()
        if label=='MERCHANT' and not result['merchant'] and text:
            set_field('merchant',text,'ser','medium')
        if label=='DATE' and not result['date']:
            d=parse_date(text,date_order)
            if d:
                set_field('date',d[0],'ser',d[1]);
                if d[2]: warnings.append(d[2])
        if label=='TIME' and not result['time']:
            t=valid_time(text)
            if t: set_field('time',t,'ser','medium')

    # Explicit TOTAL line, either in the same OCR region or a box to its right.
    candidates=[]
    for item in items:
        text=item.get('transcription','').strip()
        if EXCLUDE.search(text) or not TOTAL.match(text): continue
        direct=money_values(TOTAL.sub('',text,count=1))
        if direct:
            candidates.append((direct[-1],'total_line','high'))
            continue
        b=bbox(item)
        if not b: continue
        cy=(b[1]+b[3])/2; height=max(1,b[3]-b[1])
        nearby=[]
        for other in items:
            ob=bbox(other)
            if other is item or not ob or ob[0]<b[2]-3: continue
            oy=(ob[1]+ob[3])/2
            if abs(oy-cy)>max(height,ob[3]-ob[1])*0.8: continue
            vals=money_values(other.get('transcription',''))
            if len(vals)==1: nearby.append((abs(oy-cy),vals[0]))
        if nearby:
            nearby.sort()
            bestdist=nearby[0][0]
            nearest={v for dist,v in nearby if abs(dist-bestdist)<3}
            if len(nearest)==1:
                candidates.append((nearest.pop(),'adjacent_total','medium'))
    distinct={c[0] for c in candidates}
    if len(distinct)==1:
        value=next(iter(distinct)); chosen=next(c for c in candidates if c[0]==value)
        set_field('total',value,chosen[1],chosen[2])
    elif len(distinct)>1:
        warnings.append('conflicting_explicit_totals')
    else:
        ser_values={v for item in items if item.get('pred','').upper()=='TOTAL' for v in money_values(item.get('transcription',''))}
        if len(ser_values)==1: set_field('total',ser_values.pop(),'ser','low')
        elif len(ser_values)>1: warnings.append('multiple_ser_totals')

    for item in items:
        text=item.get('transcription','')
        if result['date'] is None:
            d=parse_date(text,date_order)
            if d:
                set_field('date',d[0],'ocr_pattern',d[1]);
                if d[2]: warnings.append(d[2])
        if result['time'] is None:
            t=valid_time(text)
            if t: set_field('time',t,'ocr_pattern','medium')
    for field in result:
        if result[field] is None: warnings.append('missing_'+field)
    return {**result,'sources':sources,'confidence':confidence,'warnings':list(dict.fromkeys(warnings))}

def process_file(input_path,output_path,date_order=None):
    rows=[]
    for line in Path(input_path).read_text(encoding='utf-8').splitlines():
        if not line.strip(): continue
        image,raw=line.split('\t',1)
        rows.append({'image':Path(image).name,**extract(json.loads(raw),date_order)})
    Path(output_path).write_text(json.dumps(rows,indent=2,ensure_ascii=False),encoding='utf-8')
    return rows

if __name__=='__main__':
    if len(sys.argv) not in (3,4):
        raise SystemExit('Usage: python hybrid_receipt_v2.py input.txt output.json [MDY|DMY]')
    order=sys.argv[3].upper() if len(sys.argv)==4 else None
    if order not in (None,'MDY','DMY'): raise SystemExit('Date order must be MDY or DMY')
    print(json.dumps(process_file(sys.argv[1],sys.argv[2],order),indent=2,ensure_ascii=False))
