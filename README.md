# 지적재산권 분쟁 사례 분석 플랫폼

`산업별 디자인분쟁 사례집 100선`과 외부 지적재산권 분쟁 사례를 검색, 비교, 분석할 수 있도록 만든 Next.js 기반 웹 애플리케이션입니다.

정적 JSON 데이터(`data/cases.json`)를 중심으로 동작하며, 향후 API 또는 데이터베이스로 쉽게 확장할 수 있도록 구성되어 있습니다.

## 프로젝트 목표

- 산업별 지적재산권 분쟁 사례 탐색
- 사건별 핵심 쟁점 요약
- 원고·피고 디자인 또는 제품 이미지 비교
- 판단 결과 및 실무 시사점 확인
- 검색, 필터링, 비교, 분석 대시보드 제공
- OCR 기반 PDF 사례집 데이터화 파이프라인 준비

## 기술 스택

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Fuse.js

## 주요 페이지

- `/` 메인 페이지
- `/cases` 지적재산권 분쟁 사례 목록
- `/cases/[id]` 사례 상세 페이지
- `/industries` 산업별 지적재산권 분쟁 분석
- `/compare` 사례 비교
- `/analytics` 분석 대시보드

## 현재 데이터 범위

- `data/cases.json` 기반 정적 데이터 사용
- 현재 사례 수: 21건
- `001`~`020`: 사례집 기반 사례 정리
- `021`: 외부 사례
  - `알고케어 vs 롯데헬스케어 AI 영양제 디스펜서 기술분쟁`

주의:
- 일부 사례는 PDF 원문 기준으로 우선 구조화한 상태이며, 후속 검수 과정에서 문구와 메타데이터가 더 보강될 수 있습니다.
- 외부 사례는 기사 및 별도 문서를 바탕으로 정리했습니다.

## 폴더 구조

```text
app/                App Router 페이지
components/         재사용 UI 컴포넌트
data/               사례 JSON, 분류 데이터, OCR 결과
lib/                검색/필터/통계 유틸
public/cases/       사례별 이미지 자산
public/pages/       PDF 페이지 추출 이미지
scripts/            PDF 추출, OCR, JSON 생성 스크립트
types/              타입 정의
```

## 실행 방법

의존성 설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

프로덕션 빌드:

```bash
npm run build
npm run start
```

기본 접속 주소:

```text
http://localhost:3000
```

로컬 운영 과정에서 별도 포트를 사용할 경우 `3001` 등 다른 포트로 실행할 수 있습니다.

## 데이터 구조

사례 데이터는 아래 구조를 따릅니다.

```ts
export type DesignCase = {
  id: string;
  title: string;
  industry: string;
  productCategory: string;
  country: string;
  disputeType: string;
  decisionType: string;
  result: string;
  plaintiff: string;
  defendant: string;
  caseNumber: string;
  decisionDate: string;
  issueSummary: string;
  factsSummary: string;
  legalIssue: string;
  judgmentCriteria?: string[];
  similarityFactors: string[];
  differenceFactors: string[];
  keyTakeaway: string;
  sourcePages: number[];
  sourceLabel?: string;
  sourceLinks?: { label: string; url: string }[];
  images: {
    plaintiffDesign?: string;
    defendantDesign?: string;
    comparisonImage?: string;
  };
  tags: string[];
};
```

## 검색 및 분석 기능

- 제목, 쟁점, 태그 기반 검색
- 산업, 분쟁 유형, 국가, 결과 필터
- 사례 번호/산업 기준 정렬
- 산업별 사례 수 시각화
- 분쟁 유형 분포 시각화
- 판단 결과 분포 시각화
- 복수 사례 비교 테이블

## OCR 및 데이터화 파이프라인

이미지형 PDF를 데이터화하기 위한 스크립트를 포함하고 있습니다.

### 1. PDF 페이지 이미지 추출

```bash
npm run extract:pages
```

실행 스크립트:

- `scripts/extract_pdf_pages.py`

### 2. OCR 수행

```bash
npm run ocr:pages
```

실행 스크립트:

- `scripts/ocr_pages.py`

### 3. 사례 JSON 초안 생성

```bash
npm run build:cases
```

실행 스크립트:

- `scripts/build_cases_json.py`

생성 결과물은 OCR 품질에 따라 반드시 수동 검수가 필요합니다.

## 이미지 자산 처리

- 사례집 기반 사례는 PDF 원문 페이지를 바탕으로 원고/피고/비교 이미지를 정리합니다.
- 일부 외부 사례는 기사 이미지, 사용자 제공 이미지, 비교 도판을 활용합니다.
- 사례별 이미지는 `public/cases/<id>/` 아래에 저장합니다.

예:

```text
public/cases/021/plaintiff.png
public/cases/021/defendant.png
public/cases/021/comparison.png
```

## 향후 확장 방향

- 사례 100건 전체 검수 및 구조화 완료
- Supabase/PostgreSQL 연동
- API 기반 데이터 조회
- 벡터 검색 또는 RAG 기반 질의응답
- 판결문/심결문 핵심 문장 자동 요약
- 사례별 판시 포인트 태깅 자동화

## 저작권

```text
Copyright(C) Jaemin Jung, All Rights Reserved.
```
