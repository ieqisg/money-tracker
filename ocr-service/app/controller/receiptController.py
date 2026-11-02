import asyncio
import json
import logging
import subprocess
import sys
import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter(prefix="/api/receipt-extraction", tags=["Receipt OCR"])

logger = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[2]
RUNNER = ROOT / "run_receipt_ocr.py"

MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
}

ocr_lock = asyncio.Lock()


def run_extraction(image_path: Path, output_dir: Path):
    command = [
        sys.executable,
        str(RUNNER),
        str(image_path),
        "--output",
        str(output_dir),
    ]

    completed = subprocess.run(
        command,
        cwd=ROOT,
        capture_output=True,
        text=True,
        timeout=600,
    )

    if completed.returncode != 0:
        logger.error("OCR failed: %s", completed.stderr[-3000:])
        raise RuntimeError("OCR inference failed")

    result_path = output_dir / "receipt_result.json"

    if not result_path.exists():
        raise RuntimeError("OCR result not generated")

    results = json.loads(result_path.read_text(encoding="utf-8"))

    if not isinstance(results, list) or len(results) != 1:
        raise RuntimeError("Unexpected OCR result format")

    return results[0]


@router.post("/extract")
async def extract_receipt(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Only JPEG and PNG images are supported",
        )

    with tempfile.TemporaryDirectory(prefix="ocr-") as directory:
        work_dir = Path(directory)

        image_path = work_dir / (
            str(uuid.uuid4()) + ALLOWED_TYPES[file.content_type]
        )

        size = 0

        with image_path.open("wb") as output:
            while chunk := await file.read(1024 * 1024):
                size += len(chunk)

                if size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="Maximum file size is 10 MB",
                    )

                output.write(chunk)

        await file.close()

        if size == 0:
            raise HTTPException(
                status_code=400,
                detail="Uploaded image is empty",
            )

        with image_path.open("rb") as f:
            signature = f.read(12)

        if not (
            file.content_type == "image/jpeg"
            and signature.startswith(b"\xff\xd8\xff")
            or file.content_type == "image/png"
            and signature.startswith(b"\x89PNG\r\n\x1a\n")
        ):
            raise HTTPException(
                status_code=415,
                detail="Invalid image content",
            )

        try:
            async with ocr_lock:
                result = await asyncio.to_thread(
                    run_extraction,
                    image_path,
                    work_dir / "results",
                )

        except subprocess.TimeoutExpired:
            raise HTTPException(
                status_code=504,
                detail="OCR processing timed out",
            )
        except Exception:
            logger.exception("Receipt extraction failed")
            raise HTTPException(
                status_code=500,
                detail="Receipt extraction failed",
            )

        return {
            "success": True,
            "data": result,
            "requires_review": True,
        }
