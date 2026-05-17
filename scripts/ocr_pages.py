from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image
from rapidocr_onnxruntime import RapidOCR


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=int, default=1)
    parser.add_argument("--end", type=int, default=None)
    parser.add_argument("--output", type=str, default="")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    image_dir = Path("public/pages")
    output_path = Path(args.output) if args.output else Path("data/ocr-pages.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if not image_dir.exists():
        raise FileNotFoundError(f"Page image folder not found: {image_dir}")

    engine = RapidOCR()
    page_images = sorted(image_dir.glob("page_*.png"))
    batch_results = []

    for image_path in page_images:
        page_number = int(image_path.stem.split("_")[1])
        if page_number < args.start:
            continue
        if args.end is not None and page_number > args.end:
            continue

        image = Image.open(image_path)
        ocr_result, _ = engine(image)
        text = "\n".join(item[1] for item in ocr_result) if ocr_result else ""
        batch_results.append({"page": page_number, "text": text.strip()})
        print(f"Saved OCR for page {page_number}")

    output_path.write_text(
        json.dumps(batch_results, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print(f"Saved OCR results to {output_path}")


if __name__ == "__main__":
    main()
