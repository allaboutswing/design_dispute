import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, FileSearch, Grid2x2, Home, SplitSquareVertical } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "지적재산권 분쟁 사례 분석 플랫폼",
  description:
    "산업별 지적재산권 분쟁 사례를 검색, 비교, 분석할 수 있는 지적재산권 분쟁 사례 분석 플랫폼",
};

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/cases", label: "사례 검색", icon: FileSearch },
  { href: "/industries", label: "산업별 보기", icon: Grid2x2 },
  { href: "/compare", label: "사례 비교", icon: SplitSquareVertical },
  { href: "/analytics", label: "판단 결과 분석", icon: BarChart3 },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[rgba(248,250,255,0.96)] shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="container-shell py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/92 px-3 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)] lg:border-transparent lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#152033] shadow-[0_10px_30px_rgba(21,32,51,0.18)]">
                    <Image
                      src="/brand/brand-icon.svg"
                      alt="지적재산권 분쟁 사례 분석 플랫폼 아이콘"
                      width={34}
                      height={34}
                      className="h-8 w-8"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold tracking-[-0.01em] text-slate-900 sm:text-base">
                      지적재산권 분쟁 사례 분석 플랫폼
                    </p>
                  </div>
                </Link>

                <nav className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group rounded-2xl border border-white/85 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(246,248,255,0.96))] px-4 py-2.5 text-center text-sm font-medium text-slate-700 shadow-[0_14px_26px_rgba(148,163,184,0.14)] transition hover:-translate-y-0.5 hover:border-brand-100 hover:bg-[linear-gradient(180deg,_#ffffff,_#eef4ff)] hover:text-ink lg:rounded-full lg:border-slate-200/80 lg:bg-white/88 lg:px-4 lg:py-2.5 lg:shadow-none"
                    >
                      <span className="inline-flex items-center justify-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(180deg,_#eff6ff,_#dbeafe)] text-brand-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition group-hover:bg-[linear-gradient(180deg,_#dbeafe,_#bfdbfe)]">
                          <item.icon className="h-3.5 w-3.5" />
                        </span>
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          <main className="container-shell flex-1 py-6 sm:py-8">{children}</main>

          <footer className="border-t border-slate-200/80 bg-white/92 backdrop-blur-xl">
            <div className="container-shell py-5 text-sm text-slate-600">
              <p>Copyright(C) Jaemin Jung, All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
