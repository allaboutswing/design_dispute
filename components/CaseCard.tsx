import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ResultBadge } from "@/components/ResultBadge";
import type { DesignCase } from "@/types/case";

export function CaseCard({ item }: { item: DesignCase }) {
  return (
    <Link href={`/cases/${item.id}`} className="group block">
      <Card className="h-full p-5 transition duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_22px_44px_rgba(21,32,51,0.12)]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              {item.industry}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
          </div>
          <ResultBadge result={item.result} />
        </div>

        <div className="grid gap-2 rounded-2xl bg-slate-50/90 p-3 text-sm text-slate-600">
          <p>분쟁유형: {item.disputeType}</p>
          <p>국가: {item.country}</p>
          <p>사건번호: {item.caseNumber || "-"}</p>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{item.issueSummary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center text-sm font-medium text-ink">
          사례 보기
          <ArrowUpRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Card>
    </Link>
  );
}
