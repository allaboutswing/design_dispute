import { Suspense } from "react";
import { CompareWorkspace } from "@/components/CompareWorkspace";
import { getAllCases } from "@/lib/cases";

export default function ComparePage() {
  const allCases = getAllCases();

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-semibold text-brand-700">사례 비교</p>
        <h1 className="mt-1 text-3xl font-semibold">복수 사례 비교 분석</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          두 개 이상의 사례를 선택해 산업, 분쟁 유형, 결과, 법적 쟁점, 시사점을 한눈에
          비교할 수 있습니다.
        </p>
      </section>

      <Suspense>
        <CompareWorkspace allCases={allCases} />
      </Suspense>
    </div>
  );
}
