import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Scale, Search, Sparkles } from "lucide-react";
import { CaseCard } from "@/components/CaseCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllCases, getFeaturedCases, getIndustries } from "@/lib/cases";

export default function HomePage() {
  const cases = getAllCases();
  const featuredCases = getFeaturedCases();
  const industries = getIndustries();
  const spotlightCase = featuredCases[0];
  const todayLabel = "2026.05.17";

  return (
    <div className="space-y-10">
      <section>
        <div className="overflow-hidden rounded-[32px] bg-[#152033] text-white shadow-[0_30px_80px_rgba(21,32,51,0.22)]">
          <div className="soft-grid grid gap-8 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_28%)] p-8 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-slate-200">
                  <Sparkles className="h-4 w-4" />
                  디자인 분쟁 사례 분석 플랫폼
                </div>
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.18] tracking-[-0.03em] sm:text-5xl">
                  산업별 디자인 분쟁 사례를
                  <br />
                  더 빠르게 찾고 깊게 비교합니다
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px]">
                  법률 실무, 기업 IP 전략, 디자인 연구를 위해 사건별 쟁점과 유사·차이 요소를 한
                  화면에서 확인할 수 있도록 설계했습니다.
                </p>

                <form action="/cases" method="get" className="mt-8 max-w-2xl">
                  <div className="rounded-[28px] bg-white/95 p-2 shadow-[0_18px_38px_rgba(0,0,0,0.14)]">
                    <SearchBar />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      사례 검색
                    </Button>
                    <Link href="/analytics">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/20 bg-white/10 text-white hover:bg-white/16 hover:text-white"
                      >
                        대시보드 보기
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["산업별 필터", "판단 결과 비교", "유사 요소 분석", "실제 사례 이미지"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Spotlight</p>
                    <p className="mt-2 text-xl font-semibold leading-snug">{spotlightCase.title}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
                    {spotlightCase.result}
                  </span>
                </div>
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.09),_rgba(255,255,255,0.03))]">
                  <div className="relative flex min-h-[320px] items-center justify-center px-6 py-6">
                    <Image
                      src={
                        spotlightCase.images.comparisonImage ??
                        spotlightCase.images.plaintiffDesign ??
                        ""
                      }
                      alt={spotlightCase.title}
                      width={900}
                      height={640}
                      unoptimized
                      className="mx-auto h-auto max-h-[280px] w-auto max-w-full rounded-2xl object-contain shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                    />
                  </div>
                  <div className="border-t border-white/10 bg-black/15 px-5 py-4">
                    <p className="text-sm leading-7 text-slate-200">{spotlightCase.issueSummary}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] bg-white p-5 text-ink shadow-card">
                  <Scale className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-sm text-slate-500">전체 사례 수</p>
                  <p className="mt-1 text-3xl font-semibold">{cases.length}</p>
                </div>
                <div className="rounded-[24px] bg-[#f5f1e8] p-5 text-ink shadow-card">
                  <Building2 className="h-5 w-5 text-brand-700" />
                  <p className="mt-4 text-sm text-slate-500">산업 분류</p>
                  <p className="mt-1 text-3xl font-semibold">{industries.length}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Today</p>
                  <div className="mt-4 flex items-center gap-2 text-slate-300">
                    <CalendarDays className="h-4 w-4" />
                    <p className="text-sm">오늘 날짜</p>
                  </div>
                  <p className="mt-1 text-2xl font-semibold">{todayLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: "사례 검색", desc: "조건별 필터와 키워드 검색", href: "/cases" },
          { title: "산업별 보기", desc: "산업별 결과와 분쟁유형 시각화", href: "/industries" },
          { title: "사례 비교", desc: "복수 사건을 표 형태로 비교", href: "/compare" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group block">
            <Card className="h-full p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_22px_44px_rgba(21,32,51,0.1)]">
              <p className="text-sm font-semibold text-brand-700">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              <div className="mt-6 flex items-center text-sm font-medium text-ink">
                바로가기
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Card>
          </Link>
        ))}
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-brand-700">대표 사례</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em]">주요 디자인 분쟁 사례</h2>
          </div>
          <Link href="/cases" className="text-sm font-medium text-slate-600">
            전체 보기
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredCases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
