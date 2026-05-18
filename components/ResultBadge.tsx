import { cn } from "@/lib/utils";

const badgeMap: Record<string, string> = {
  "유사 인정": "bg-emerald-50 text-success border border-emerald-200",
  "유사 부정": "bg-rose-50 text-danger border border-rose-200",
  무효: "bg-amber-50 text-warning border border-amber-200",
  "권리범위에 속함": "bg-blue-50 text-brand-700 border border-blue-200",
  "권리범위에 속하지 않음": "bg-slate-100 text-slate-700 border border-slate-200",
  "침해 인정": "bg-emerald-50 text-success border border-emerald-200",
  "침해 부정": "bg-rose-50 text-danger border border-rose-200",
  "조정 성립": "bg-violet-50 text-violet-700 border border-violet-200",
  "디자인 보호 쟁점": "bg-orange-50 text-warning border border-orange-200",
  "유사하지 않음": "bg-slate-100 text-slate-700 border border-slate-200",
  "무효심결 취소": "bg-sky-50 text-sky-700 border border-sky-200",
  "우선권 인정": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  파기환송: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  "합의로 종결": "bg-zinc-100 text-zinc-700 border border-zinc-200",
};

export function ResultBadge({ result }: { result: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        badgeMap[result] ?? "border border-slate-200 bg-slate-100 text-slate-700"
      )}
    >
      {result}
    </span>
  );
}
