from pathlib import Path

import fitz


def main() -> None:
    pdf_path = Path("source/디자인분쟁사례집 100선.pdf")
    output_dir = Path("public/pages")
    output_dir.mkdir(parents=True, exist_ok=True)

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF 파일을 찾을 수 없습니다: {pdf_path}")

    document = fitz.open(pdf_path)
    for page_num in range(len(document)):
        page = document[page_num]
        pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        output_path = output_dir / f"page_{page_num + 1:03d}.png"
        pixmap.save(output_path)

    print(f"{len(document)}개 페이지를 {output_dir}에 저장했습니다.")


if __name__ == "__main__":
    main()
