"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CaseComparisonTable } from "@/components/CaseComparisonTable";
import { CompareSelector } from "@/components/CompareSelector";
import type { DesignCase } from "@/types/case";

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

  const selectedCases = useMemo(
    () =>
      selectedIds.length > 0
        ? allCases.filter((item) => selectedIds.includes(item.id))
        : allCases.slice(0, 2),
    [allCases, selectedIds]
  );

  return (
    <div className="space-y-6">
      <CompareSelector allCases={allCases} initialIds={selectedIds} />
      <CaseComparisonTable cases={selectedCases} />
    </div>
  );
}
