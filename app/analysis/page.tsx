import { Building2, CircleGauge, Scale } from "lucide-react";
import { IndustryChart } from "@/components/IndustryChart";
import { Card } from "@/components/ui/card";
import { getIndustryStats } from "@/lib/cases";

export default function AnalysisPage() {
  const stats = getIndustryStats();

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-700">산업 분석</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">산업별 디자인 분쟁 분석</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              산업별 사례 수와 분쟁 유형, 판단 결과 분포를 블루톤 차트로 한눈에 확인할 수 있습니다.
            </p>
          </div>
          <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
            시각화 대시보드
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-brand-100 bg-[linear-gradient(180deg,_rgba(49,94,251,0.08),_rgba(255,255,255,0.9))] p-6">
          <Building2 className="h-5 w-5 text-brand-700" />
          <p className="mt-4 text-sm text-slate-500">산업 수</p>
          <p className="mt-1 text-3xl font-semibold">{stats.byIndustry.length}</p>
        </Card>
        <Card className="border-brand-100 bg-[linear-gradient(180deg,_rgba(79,125,255,0.08),_rgba(255,255,255,0.9))] p-6">
          <Scale className="h-5 w-5 text-brand-700" />
          <p className="mt-4 text-sm text-slate-500">분쟁 유형 수</p>
          <p className="mt-1 text-3xl font-semibold">{stats.byDisputeType.length}</p>
        </Card>
        <Card className="border-brand-100 bg-[linear-gradient(180deg,_rgba(139,176,255,0.14),_rgba(255,255,255,0.92))] p-6">
          <CircleGauge className="h-5 w-5 text-brand-700" />
          <p className="mt-4 text-sm text-slate-500">판단 결과 수</p>
          <p className="mt-1 text-3xl font-semibold">{stats.byResult.length}</p>
        </Card>
      </div>

      <IndustryChart
        industryData={stats.byIndustry}
        disputeData={stats.byDisputeType}
        resultData={stats.byResult}
      />
    </div>
  );
}
