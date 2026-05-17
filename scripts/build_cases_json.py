from __future__ import annotations

import json
import re
from pathlib import Path


CASE_PATTERN = re.compile(r"(?:사례\s*)?(\d{1,3})")


def main() -> None:
    ocr_path = Path("data/ocr-pages.json")
    output_path = Path("data/cases.generated.json")

    if not ocr_path.exists():
        raise FileNotFoundError(f"OCR 결과 파일을 찾을 수 없습니다: {ocr_path}")

    pages = json.loads(ocr_path.read_text(encoding="utf-8"))
    generated_cases = []

    for page in pages:
        text = page.get("text", "")
        match = CASE_PATTERN.search(text)
        if not match:
            continue

        case_id = match.group(1).zfill(3)
        generated_cases.append(
            {
                "id": case_id,
                "title": "",
                "industry": "",
                "productCategory": "",
                "country": "한국",
                "disputeType": "",
                "decisionType": "",
                "result": "",
                "plaintiff": "",
                "defendant": "",
                "caseNumber": "",
                "decisionDate": "",
                "issueSummary": text[:200].strip(),
                "factsSummary": "",
                "legalIssue": "",
                "similarityFactors": [],
                "differenceFactors": [],
                "keyTakeaway": "",
                "sourcePages": [page["page"]],
                "images": {
                    "plaintiffDesign": f"/cases/{case_id}/plaintiff.png",
                    "defendantDesign": f"/cases/{case_id}/defendant.png",
                    "comparisonImage": f"/cases/{case_id}/comparison.png"
                },
                "tags": []
            }
        )

    output_path.write_text(json.dumps(generated_cases, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"초안 사례 JSON을 {output_path}에 저장했습니다. 수동 검수가 필요합니다.")


if __name__ == "__main__":
    main()
