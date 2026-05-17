import Fuse from "fuse.js";
import type { DesignCase } from "@/types/case";

export function searchCases(cases: DesignCase[], keyword?: string): DesignCase[] {
  const normalizedKeyword = keyword?.trim();

  if (!normalizedKeyword) {
    return cases;
  }

  const fuse = new Fuse(cases, {
    keys: [
      "title",
      "industry",
      "productCategory",
      "issueSummary",
      "factsSummary",
      "legalIssue",
      "keyTakeaway",
      "tags"
    ],
    threshold: 0.3,
    ignoreLocation: true
  });

  return fuse.search(normalizedKeyword).map((result) => result.item);
}
