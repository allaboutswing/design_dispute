import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getAllCases, getFilterOptions, getIndustryStats } from "@/lib/cases";

export default function DashboardPage() {
  const cases = getAllCases();
  const options = getFilterOptions();
  const stats = getIndustryStats();

  const latestCase = [...cases].sort((a, b) => b.decisionDate.localeCompare(a.decisionDate))[0];

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-semibold text-brand-700">분석 대시보드</p>
        <h1 className="mt-1 text-3xl font-semibold">사례 데이터 한눈에 보기</h1>
      </section>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-slate-500">전체 사례</p>
          <p className="mt-2 text-3xl font-semibold">{cases.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-500">산업 분류</p>
          <p className="mt-2 text-3xl font-semibold">{options.industries.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-500">분쟁 유형</p>
          <p className="mt-2 text-3xl font-semibold">{options.disputeTypes.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-slate-500">최근 결정일</p>
          <p className="mt-2 text-lg font-semibold">{latestCase?.decisionDate || "-"}</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">결과 분포 요약</h2>
            <Link href="/industries" className="text-sm text-slate-500">
              전체 분석 보기
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {stats.byResult.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.value}건</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-brand-500"
                    style={{ width: `${(item.value / cases.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">대표 사례 하이라이트</h2>
          {latestCase ? (
            <>
              <p className="mt-4 text-sm font-semibold text-brand-700">{latestCase.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{latestCase.issueSummary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {latestCase.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/cases/${latestCase.id}`}
                className="mt-6 inline-flex rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
              >
                상세 보기
              </Link>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-600">표시할 사례가 없습니다.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
