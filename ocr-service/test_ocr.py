from pathlib import Path
from paddleocr import PaddleOCR

output_dir = Path("./output")
output_dir.mkdir(parents=True, exist_ok=True)

pipeline = PaddleOCR(
    device="cpu",
    text_detection_model_name="PP-OCRv5_mobile_det",
    text_recognition_model_name="PP-OCRv5_mobile_rec",
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False,
)

results = pipeline.predict("jollireceipt.jpg")
lines = []
for result in results:
    result.print()
    result.save_to_img(str(output_dir))
    result.save_to_json(str(output_dir))
    lines.extend(result["rec_texts"])
if "TOTAL" in lines:
    print("Tite")
