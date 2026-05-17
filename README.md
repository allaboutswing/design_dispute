# 디자인 분쟁 사례 분석 플랫폼

「산업별 디자인분쟁 사례집 100선」 PDF를 검색, 비교, 분석 가능한 정적 우선 웹 애플리케이션으로 전환하는 Next.js 프로젝트입니다.

## 주요 기능

- 산업별 사례 탐색
- 키워드 및 조건 필터 검색
- 사례 상세 분석
- 사례 간 비교 테이블
- 산업 및 결과 분포 시각화
- OCR 기반 데이터화 파이프라인 준비

## 기술 스택

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Fuse.js

## 폴더 구조

```text
app/              페이지 라우트
components/       재사용 UI 컴포넌트
data/             사례 JSON, 분류 상수, OCR 결과
lib/              검색/필터/데이터 유틸
public/pages/     PDF 페이지 이미지
scripts/          PDF 추출, OCR, JSON 생성 스크립트
```

## 실행 방법

```bash
npm install
npm run dev
```

## 데이터 파이프라인

1. 원본 PDF를 `source/디자인분쟁사례집 100선.pdf`에 둡니다.
2. 페이지 이미지 추출:

```bash
npm run extract:pages
```

3. OCR 수행:

```bash
npm run ocr:pages
```

4. 사례 JSON 초안 생성:

```bash
npm run build:cases
```

생성된 `data/cases.generated.json`은 OCR 품질에 따라 수동 검수가 필요합니다.

## 현재 상태

- 샘플 사례 5건 포함
- `data/cases.json` 기반 정적 우선 구조
- 추후 API 또는 DB로 교체하기 쉽도록 데이터 접근 로직 분리
