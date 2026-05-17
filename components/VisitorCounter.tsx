"use client";

import { useEffect, useState } from "react";

const VISITOR_COUNT_KEY = "design-dispute-visitor-count";
const VISITOR_SESSION_KEY = "design-dispute-visitor-session";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const storedCount = Number(globalThis.localStorage?.getItem(VISITOR_COUNT_KEY) ?? "0");
      const hasVisitedThisSession =
        globalThis.sessionStorage?.getItem(VISITOR_SESSION_KEY) === "true";

      if (hasVisitedThisSession) {
        setCount(Number.isFinite(storedCount) ? storedCount : 0);
        return;
      }

      const safeCount = Number.isFinite(storedCount) ? storedCount : 0;
      const nextCount = safeCount + 1;

      globalThis.localStorage?.setItem(VISITOR_COUNT_KEY, String(nextCount));
      globalThis.sessionStorage?.setItem(VISITOR_SESSION_KEY, "true");
      setCount(nextCount);
    } catch {
      setCount(null);
    }
  }, []);

  return (
    <p className="text-slate-500">
      방문자수:{" "}
      <span className="font-semibold text-brand-700">
        {count === null ? "확인 불가" : count.toLocaleString("ko-KR")}
      </span>
    </p>
  );
}
