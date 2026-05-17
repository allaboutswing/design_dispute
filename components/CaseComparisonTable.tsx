import { Card } from "@/components/ui/card";
import type { DesignCase } from "@/types/case";

const rows: Array<{ key: keyof DesignCase; label: string }> = [
  { key: "industry", label: "산업" },
  { key: "productCategory", label: "제품군" },
  { key: "disputeType", label: "분쟁 유형" },
  { key: "result", label: "판단 결과" },
  { key: "legalIssue", label: "법적 쟁점" },
  { key: "similarityFactors", label: "유사 판단 요소" },
  { key: "differenceFactors", label: "차이 판단 요소" },
  { key: "keyTakeaway", label: "실무 시사점" },
];

function formatValue(item: DesignCase, key: keyof DesignCase): string {
  const value = item[key];

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string") {
    return value || "-";
  }

  return "-";
}

export function CaseComparisonTable({ cases }: { cases: DesignCase[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">비교 항목</th>
              {cases.map((item) => (
                <th key={item.id} className="border-b border-slate-200 px-4 py-3 text-left font-semibold">
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td className="border-b border-slate-200 px-4 py-4 font-medium text-slate-700">{row.label}</td>
                {cases.map((item) => (
                  <td key={item.id + row.key} className="border-b border-slate-200 px-4 py-4 align-top text-slate-600">
                    {formatValue(item, row.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
