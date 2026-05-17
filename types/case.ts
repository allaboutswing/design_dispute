export type CaseImages = {
  plaintiffDesign?: string;
  defendantDesign?: string;
  comparisonImage?: string;
};

export type DesignCase = {
  id: string;
  title: string;
  industry: string;
  productCategory: string;
  country: string;
  disputeType: string;
  decisionType: string;
  result: string;
  plaintiff: string;
  defendant: string;
  caseNumber: string;
  decisionDate: string;
  issueSummary: string;
  factsSummary: string;
  legalIssue: string;
  judgmentCriteria?: string[];
  similarityFactors: string[];
  differenceFactors: string[];
  keyTakeaway: string;
  sourcePages: number[];
  images: CaseImages;
  tags: string[];
};

export type CaseFilters = {
  industry?: string;
  disputeType?: string;
  country?: string;
  result?: string;
  keyword?: string;
  sort?: "caseNumber" | "industry";
};
