import { Suspense } from "react";
import { CasesExplorer } from "@/components/CasesExplorer";
import { getAllCases, getFilterOptions } from "@/lib/cases";

export default function CasesPage() {
  const cases = getAllCases();
  const options = getFilterOptions();

  return (
    <div className="space-y-6">
      <section className="panel p-7">
        <p className="text-sm font-semibold text-brand-700">사례 검색</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">디자인 분쟁 사례 목록</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          산업, 분쟁 유형, 국가, 판단 결과 기준으로 필터링하고 원하는 키워드로 빠르게
          사례를 찾을 수 있습니다.
        </p>
      </section>

      <Suspense>
        <CasesExplorer allCases={cases} options={options} />
      </Suspense>
    </div>
  );
}
