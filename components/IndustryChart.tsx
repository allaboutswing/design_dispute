"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

const colors = ["#315efb", "#4f7dff", "#6c97ff", "#8bb0ff", "#a9c6ff", "#c8ddff", "#d9e6ff"];

type Stat = {
  name: string;
  value: number;
};

const tooltipStyle = {
  borderRadius: "16px",
  border: "1px solid rgba(148, 163, 184, 0.22)",
  backgroundColor: "rgba(255,255,255,0.96)",
  boxShadow: "0 16px 36px rgba(21,32,51,0.12)",
};

function legendColor(index: number) {
  return colors[index % colors.length];
}

export function IndustryChart({
  industryData,
  disputeData,
  resultData,
}: {
  industryData: Stat[];
  disputeData: Stat[];
  resultData: Stat[];
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden p-5 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Industry Map</p>
            <h3 className="mt-1 text-lg font-semibold">산업별 사례 수</h3>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            총 {industryData.reduce((sum, item) => sum + item.value, 0)}건
          </span>
        </div>
        <div className="h-80 rounded-[20px] bg-[linear-gradient(180deg,_rgba(49,94,251,0.05),_rgba(255,255,255,0.65))] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(49,94,251,0.12)" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(49,94,251,0.06)" }}
                formatter={(value: number) => [`${value}건`, "사례 수"]}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#315efb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="overflow-hidden p-5">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Dispute Mix</p>
          <h3 className="mt-1 text-lg font-semibold">분쟁 유형 분포</h3>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            도넛 차트는 각 분쟁 유형 비중을 보여주고, 오른쪽 범례에서 항목별 건수를 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="h-[320px] rounded-[20px] bg-[linear-gradient(180deg,_rgba(49,94,251,0.05),_rgba(255,255,255,0.65))] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 18, right: 22, bottom: 26, left: 22 }}>
                <Pie
                  data={disputeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={86}
                  innerRadius={42}
                  label={({ percent }) => `${Math.round((percent ?? 0) * 100)}%`}
                  labelLine={false}
                >
                  {disputeData.map((entry, index) => (
                    <Cell key={entry.name} fill={legendColor(index)} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number) => [`${value}건`, "사례 수"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-[20px] border border-slate-200/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Legend</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {disputeData.map((item, index) => (
                <div key={item.name} className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ backgroundColor: legendColor(index) }}
                    />
                    <span className="text-sm leading-5 text-slate-700">{item.name}</span>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-slate-500">{item.value}건</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-5 xl:col-span-3">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Result Flow</p>
            <h3 className="mt-1 text-lg font-semibold">판단 결과 분포</h3>
            <p className="mt-2 text-xs text-slate-500">
              가로 막대 길이는 각 판단 결과에 해당하는 사례 수를 의미합니다.
            </p>
          </div>
          <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
            막대 길이 = 사례 수(건)
          </div>
        </div>
        <div className="h-72 rounded-[20px] bg-[linear-gradient(180deg,_rgba(49,94,251,0.05),_rgba(255,255,255,0.65))] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resultData} layout="vertical" margin={{ right: 24 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(49,94,251,0.12)" />
              <XAxis
                type="number"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                label={{ value: "사례 수(건)", position: "insideBottom", offset: -6, fill: "#64748b", fontSize: 12 }}
              />
              <YAxis type="category" dataKey="name" width={120} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(49,94,251,0.06)" }}
                formatter={(value: number) => [`${value}건`, "사례 수"]}
              />
              <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="#4f7dff">
                <LabelList dataKey="value" position="right" formatter={(value: number) => `${value}건`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
