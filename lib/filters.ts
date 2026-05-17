import type { CaseFilters, DesignCase } from "@/types/case";
import { searchCases } from "@/lib/search";

export function applyCaseFilters(allCases: DesignCase[], filters: CaseFilters): DesignCase[] {
  const searched = searchCases(allCases, filters.keyword);

  return [...searched]
    .filter((item) => {
      return (
        (!filters.industry || item.industry === filters.industry) &&
        (!filters.disputeType || item.disputeType === filters.disputeType) &&
        (!filters.country || item.country === filters.country) &&
        (!filters.result || item.result === filters.result)
      );
    })
    .sort((a, b) =>
      filters.sort === "industry"
        ? a.industry.localeCompare(b.industry, "ko")
        : a.caseNumber.localeCompare(b.caseNumber, "ko")
    );
}
