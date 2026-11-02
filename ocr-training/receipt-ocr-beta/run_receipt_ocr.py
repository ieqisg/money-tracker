
import argparse
import json
import subprocess
import sys
from pathlib import Path

from hybrid_receipt_v3 import process_file

ROOT = Path(__file__).resolve().parent

REPO = ROOT.parent / "PaddleOCR"

PYTHON = (
    ROOT.parent / "ocr-beta" / ".venv" / "bin" / "python"
)

CONFIG = "configs/kie/vi_layoutxlm/ser_receipts_v2.yml"
CHECKPOINT = "./output/receipt_ser_v2/iter_epoch_15"


def main():
    parser = argparse.ArgumentParser(
        description="Money Tracker Receipt OCR Beta"
    )
    parser.add_argument("image", type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("/content/receipt_ocr_beta/results")
    )
    parser.add_argument(
        "--date-order",
        choices=["DMY", "MDY"],
        default=None
    )
    args = parser.parse_args()

    image = args.image.resolve()

    if not image.is_file():
        parser.error(f"Receipt not found: {image}")

    if image.suffix.lower() not in {
        ".jpg", ".jpeg", ".png"
    }:
        parser.error("Expected JPG, JPEG, or PNG")

    if not PYTHON.is_file():
        parser.error("PaddleOCR environment missing")

    if not (REPO / CONFIG).is_file():
        parser.error("SER configuration missing")

    if not (
        REPO / "output/receipt_ser_v2/iter_epoch_15"
        / "model_state.pdparams"
    ).is_file():
        parser.error("Trained checkpoint missing")

    output_dir = args.output.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    # Separate directory prevents old receipts from
    # being accidentally included in this run.
    inference_dir = output_dir / "inference"
    inference_dir.mkdir(exist_ok=True)

    command = [
        str(PYTHON),
        "-u",
        "tools/infer_kie_token_ser.py",
        "-c",
        CONFIG,
        "-o",
        "Global.use_gpu=False",
        f"Architecture.Backbone.checkpoints={CHECKPOINT}",
        "Global.infer_mode=True",
        f"Global.infer_img={image}",
        f"Global.save_res_path={inference_dir}",
    ]

    print("Running OCR + SER...", flush=True)

    completed = subprocess.run(
        command,
        cwd=REPO,
        check=False
    )

    if completed.returncode != 0:
        raise SystemExit(
            f"OCR inference failed: {completed.returncode}"
        )

    predictions = inference_dir / "infer_results.txt"

    if not predictions.is_file():
        raise RuntimeError("Inference output not found")

    output_json = output_dir / "receipt_result.json"

    results = process_file(
        predictions,
        output_json,
        date_order=args.date_order
    )

    # The inference script should process one image.
    if len(results) != 1:
        raise RuntimeError(
            f"Expected 1 receipt, got {len(results)}"
        )

    print("\n===== EXTRACTED RECEIPT =====")
    print(json.dumps(
        results[0],
        indent=2,
        ensure_ascii=False
    ))

    print("\nSaved:", output_json)


if __name__ == "__main__":
    main()
