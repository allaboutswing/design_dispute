import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "지적재산권 분쟁 사례 분석 플랫폼",
  description: "산업별 지적재산권 분쟁 사례를 검색, 비교, 분석할 수 있는 지적재산권 분쟁 사례 분석 플랫폼",
};

const navItems = [
  { href: "/", label: "홈" },
  { href: "/cases", label: "사례 검색" },
  { href: "/industries", label: "산업별 보기" },
  { href: "/compare", label: "사례 비교" },
  { href: "/analytics", label: "판단 결과 분석" },
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
          <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/82 backdrop-blur-xl">
            <div className="container-shell flex items-center justify-between gap-4 py-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#152033] shadow-[0_10px_30px_rgba(21,32,51,0.18)]">
                  <Image
                    src="/brand/brand-icon.svg"
                    alt="지적재산권 분쟁 사례 분석 플랫폼 아이콘"
                    width={34}
                    height={34}
                    className="h-8 w-8"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-700">지적재산권 분쟁 사례 분석 플랫폼</p>
                </div>
              </Link>
              <nav className="flex flex-wrap items-center gap-2 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="container-shell flex-1 py-8">{children}</main>

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
