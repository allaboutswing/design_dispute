"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CaseComparisonTable } from "@/components/CaseComparisonTable";
import { CompareSelector } from "@/components/CompareSelector";
import type { DesignCase } from "@/types/case";

const DEFAULT_COMPARE_IDS = ["021", "020"];

export function CompareWorkspace({ allCases }: { allCases: DesignCase[] }) {
  const searchParams = useSearchParams();
  const selectedIds = useMemo(
    () =>
      (searchParams.get("ids") ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    [searchParams]
  );

  const fallbackIds = useMemo(() => {
    const matched = DEFAULT_COMPARE_IDS.filter((id) => allCases.some((item) => item.id === id));
    return matched.length >= 2 ? matched : allCases.slice(0, 2).map((item) => item.id);
  }, [allCases]);

  const selectedCases = useMemo(
    () =>
      selectedIds.length > 0
        ? allCases.filter((item) => selectedIds.includes(item.id))
        : allCases.filter((item) => fallbackIds.includes(item.id)),
    [allCases, fallbackIds, selectedIds]
  );

  return (
    <div className="space-y-6">
      <CompareSelector allCases={allCases} initialIds={selectedIds} fallbackIds={fallbackIds} />
      <CaseComparisonTable cases={selectedCases} />
    </div>
  );
}
