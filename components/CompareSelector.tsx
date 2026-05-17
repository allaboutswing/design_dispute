"use client";

import { useMemo, useState } from "react";
import type { DesignCase } from "@/types/case";
import { Card } from "@/components/ui/card";

export function CompareSelector({
  allCases,
  initialIds,
}: {
  allCases: DesignCase[];
  initialIds: string[];
}) {
  const defaultIds = useMemo(
    () => (initialIds.length > 0 ? initialIds : allCases.slice(0, 2).map((item) => item.id)),
    [allCases, initialIds]
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultIds);

  const toggle = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <Card className="p-5">
      <form className="space-y-4">
        <input type="hidden" name="ids" value={selectedIds.join(",")} />
        <div>
          <p className="text-sm font-medium text-slate-700">비교할 사례 선택</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {allCases.map((item) => {
              const checked = selectedIds.includes(item.id);
              return (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(item.id)}
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    <strong className="block text-ink">{item.title}</strong>
                    <span className="text-slate-500">{item.industry}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <button className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white">
          비교 반영
        </button>
      </form>
    </Card>
  );
}
