from pathlib import Path

from paddleocr import PaddleOCRVL

output_dir = Path("./output")
output_dir.mkdir(parents=True, exist_ok=True)

# NVIDIA GPU
pipeline = PaddleOCRVL()

output = pipeline.predict(
    "https://paddle-model-ecology.bj.bcebos.com/paddlex/imgs/demo_image/paddleocr_vl_demo.png")
for res in output:
    res.print()  # Print the structured prediction output
    # Save the current image's structured result in JSON format
    res.save_to_json(save_path=output_dir)
    # Save the current image's result in Markdown format
    res.save_to_markdown(save_path=output_dir)
    # Save the current image's result in Word format
    res.save_to_word(save_path="output")
