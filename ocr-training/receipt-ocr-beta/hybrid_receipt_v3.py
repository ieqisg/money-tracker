
import json
import re
import sys
from pathlib import Path

from hybrid_receipt_v2 import extract as extract_v2

TIME_PATTERN = re.compile(
    r"\b(?:1[0-2]|0?[1-9]):[0-5]\d"
    r"(?::[0-5]\d)?\s*(?:AM|PM)\b"
    r"|\b(?:[01]?\d|2[0-3]):[0-5]\d"
    r"(?::[0-5]\d)?\b",
    re.I
)


def merchant_fallback(items):
    ordered = sorted(
        items,
        key=lambda item: item.get("bbox", [0, 0, 0, 0])[1]
    )

    for item in ordered[:5]:
        text = item.get("transcription", "").strip()

        if len(text) < 3:
            continue

        if re.search(
            r"\d{3}[-.\s]\d{3}[-.\s]\d{4}|"
            r"\b(?:STREET|ROAD|AVE|LANE|BLVD|STE)\b",
            text,
            re.I
        ):
            continue

        if sum(c.isdigit() for c in text) > len(text) * 0.3:
            continue

        if re.search(r"[A-Za-z]{3,}", text):
            return text

    return None


def extract(data, date_order=None):
    items = data.get("ocr_info", [])

    result = extract_v2(data, date_order=date_order)

    sources = result.setdefault("sources", {})
    confidence = result.setdefault("confidence", {})
    warnings = result.setdefault("warnings", [])

    if not result.get("merchant"):
        merchant = merchant_fallback(items)

        if merchant:
            result["merchant"] = merchant
            sources["merchant"] = "header_fallback"
            confidence["merchant"] = "low"

            if "merchant_requires_review" not in warnings:
                warnings.append("merchant_requires_review")

    if not result.get("time"):
        for item in items:
            match = TIME_PATTERN.search(
                item.get("transcription", "")
            )

            if match:
                result["time"] = match.group().strip()

                is_ser = item.get("pred") == "TIME"

                sources["time"] = (
                    "ser" if is_ser else "ocr_pattern"
                )

                confidence["time"] = (
                    "medium" if is_ser else "low"
                )
                break

    for field in ("merchant", "date", "time", "total"):
        if result.get(field) is not None:
            warning = f"missing_{field}"
            if warning in warnings:
                warnings.remove(warning)

    return result


def process_file(input_path, output_path, date_order=None):
    results = []

    for line in Path(input_path).read_text(
        encoding="utf-8"
    ).splitlines():

        if not line.strip():
            continue

        image_path, raw = line.split("\t", 1)
        data = json.loads(raw)

        result = extract(data, date_order=date_order)
        result["image"] = Path(image_path).name

        results.append(result)

    Path(output_path).write_text(
        json.dumps(results, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )

    return results


if __name__ == "__main__":
    if len(sys.argv) not in (3, 4):
        print(
            "Usage: python hybrid_receipt_v3.py "
            "input.txt output.json [DMY|MDY]"
        )
        sys.exit(1)

    date_order = sys.argv[3] if len(sys.argv) == 4 else None

    results = process_file(
        sys.argv[1],
        sys.argv[2],
        date_order=date_order
    )

    print(json.dumps(results, indent=2, ensure_ascii=False))
