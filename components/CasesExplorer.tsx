"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CaseCard } from "@/components/CaseCard";
import { CaseFilter } from "@/components/CaseFilter";
import { applyCaseFilters } from "@/lib/filters";
import type { DesignCase } from "@/types/case";

type Options = {
  industries: string[];
  disputeTypes: string[];
  countries: string[];
  results: string[];
};

export function CasesExplorer({
  allCases,
  options,
}: {
  allCases: DesignCase[];
  options: Options;
}) {
  const searchParams = useSearchParams();
  const filters = {
    industry: searchParams.get("industry") ?? undefined,
    disputeType: searchParams.get("disputeType") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    result: searchParams.get("result") ?? undefined,
    keyword: searchParams.get("keyword") ?? undefined,
    sort: searchParams.get("sort") === "industry" ? "industry" : "caseNumber",
  } as const;

  const cases = useMemo(() => applyCaseFilters(allCases, filters), [allCases, filters]);

  return (
    <div className="space-y-6">
      <CaseFilter options={options} defaults={filters} />
      <section>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            검색 결과 <span className="font-semibold text-ink">{cases.length}</span>건
          </p>
        </div>
        {cases.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="panel p-8 text-sm text-slate-600">
            검색 조건에 맞는 사례가 없습니다. 다른 키워드나 필터로 다시 시도해 보세요.
          </div>
        )}
      </section>
    </div>
  );
}
