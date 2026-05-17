import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";

type Options = {
  industries: string[];
  disputeTypes: string[];
  countries: string[];
  results: string[];
};

type CaseFilterProps = {
  options: Options;
  defaults?: Record<string, string | undefined>;
};

export function CaseFilter({ options, defaults = {} }: CaseFilterProps) {
  const renderSelect = (name: string, label: string, values: string[]) => (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        name={name}
        defaultValue={defaults[name] ?? ""}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
      >
        <option value="">전체</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <form method="get" className="panel grid gap-4 p-5 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">통합 검색</span>
          <SearchBar value={defaults.keyword} />
        </label>
      </div>
      {renderSelect("industry", "산업", options.industries)}
      {renderSelect("disputeType", "분쟁 유형", options.disputeTypes)}
      {renderSelect("country", "국가", options.countries)}
      {renderSelect("result", "결과", options.results)}
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">정렬</span>
        <select
          name="sort"
          defaultValue={defaults.sort ?? "caseNumber"}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500"
        >
          <option value="caseNumber">사건번호순</option>
          <option value="industry">산업순</option>
        </select>
      </label>
      <div className="flex items-end gap-2">
        <Button type="submit" className="w-full">
          필터 적용
        </Button>
      </div>
    </form>
  );
}
