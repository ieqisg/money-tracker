import gradio as gr
import subprocess
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RUNNER = ROOT / "run_receipt_ocr.py"


def process_receipt(image_path):
    if not image_path:
        return {"error": "Please upload a receipt."}

    result = subprocess.run(
        [
            "python",
            str(RUNNER),
            str(image_path),
            "--output",
            str(ROOT / "results"),
        ],
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        return {
            "error": "OCR processing failed",
            "details": result.stderr[-1500:]
        }

    output = ROOT / "results" / "receipt_result.json"

    if not output.exists():
        return {"error": "No OCR results generated"}

    data = json.loads(output.read_text(encoding="utf-8"))
    return data[0] if isinstance(data, list) else data


with gr.Blocks(title="Money Tracker OCR Beta") as demo:
    gr.Markdown("# Money Tracker — Receipt OCR Beta")
    gr.Markdown("Upload a receipt to test the OCR pipeline.")

    receipt = gr.Image(
        label="Receipt image",
        type="filepath",
        sources=["upload"],
    )

    run = gr.Button("Extract Receipt")

    output = gr.JSON(label="Extracted fields")

    run.click(
        fn=process_receipt,
        inputs=receipt,
        outputs=output,
    )

demo.launch(server_name="127.0.0.1", server_port=7860)
