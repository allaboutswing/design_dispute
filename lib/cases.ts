import caseData from "@/data/cases.json";
import type { CaseFilters, DesignCase } from "@/types/case";

const cases = caseData as DesignCase[];

export function getAllCases(): DesignCase[] {
  return cases;
}

export function getCaseById(id: string): DesignCase | undefined {
  return cases.find((item) => item.id === id);
}

export function getFeaturedCases(limit = 3): DesignCase[] {
  return cases.slice(0, limit);
}

export function getIndustries(): string[] {
  return [...new Set(cases.map((item) => item.industry))];
}

export function getFilterOptions() {
  return {
    industries: getIndustries(),
    disputeTypes: [...new Set(cases.map((item) => item.disputeType))],
    countries: [...new Set(cases.map((item) => item.country))],
    results: [...new Set(cases.map((item) => item.result))]
  };
}

export function filterCases(filters: CaseFilters): DesignCase[] {
  const keyword = filters.keyword?.toLowerCase().trim();

  const filtered = cases.filter((item) => {
    const haystack = [
      item.title,
      item.issueSummary,
      item.factsSummary,
      item.legalIssue,
      ...item.tags
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!filters.industry || item.industry === filters.industry) &&
      (!filters.disputeType || item.disputeType === filters.disputeType) &&
      (!filters.country || item.country === filters.country) &&
      (!filters.result || item.result === filters.result) &&
      (!keyword || haystack.includes(keyword))
    );
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "industry") {
      return a.industry.localeCompare(b.industry, "ko");
    }
    return a.caseNumber.localeCompare(b.caseNumber, "ko");
  });
}

export function getIndustryStats() {
  const industryMap = new Map<string, number>();
  const disputeMap = new Map<string, number>();
  const resultMap = new Map<string, number>();

  cases.forEach((item) => {
    industryMap.set(item.industry, (industryMap.get(item.industry) ?? 0) + 1);
    disputeMap.set(item.disputeType, (disputeMap.get(item.disputeType) ?? 0) + 1);
    resultMap.set(item.result, (resultMap.get(item.result) ?? 0) + 1);
  });

  return {
    byIndustry: Array.from(industryMap, ([name, value]) => ({ name, value })),
    byDisputeType: Array.from(disputeMap, ([name, value]) => ({ name, value })),
    byResult: Array.from(resultMap, ([name, value]) => ({ name, value }))
  };
}
