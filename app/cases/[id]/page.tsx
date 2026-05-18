import { notFound } from "next/navigation";
import { ImageCompare } from "@/components/ImageCompare";
import { ResultBadge } from "@/components/ResultBadge";
import { Card } from "@/components/ui/card";
import { getAllCases, getCaseById } from "@/lib/cases";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-700">{children}</div>
    </Card>
  );
}

export default async function CaseDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const item = getCaseById(id);

  if (!item) {
    notFound();
  }

  const fallbackText = "원문 미기재";

  return (
    <div className="space-y-6">
      <section className="panel p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-700">{item.industry}</p>
            <h1 className="mt-2 text-3xl font-semibold">{item.title}</h1>
          </div>
          <ResultBadge result={item.result} />
        </div>

        <div className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
          <p>사건번호: {item.caseNumber || fallbackText}</p>
          <p>결정일: {item.decisionDate || fallbackText}</p>
          <p>국가: {item.country}</p>
          <p>결정유형: {item.decisionType}</p>
          <p>제품군: {item.productCategory}</p>
          <p>분쟁유형: {item.disputeType}</p>
          <p>원고: {item.plaintiff || fallbackText}</p>
          <p>피고: {item.defendant || fallbackText}</p>
        </div>
      </section>

      <ImageCompare images={item.images} />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionBlock title="쟁점 요약">{item.issueSummary}</SectionBlock>
        <SectionBlock title="사실관계 요약">{item.factsSummary}</SectionBlock>
        <SectionBlock title="법적 쟁점">{item.legalIssue}</SectionBlock>
        {item.judgmentCriteria?.length ? (
          <SectionBlock title="판단 기준">
            <ul className="list-disc pl-5">
              {item.judgmentCriteria.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </SectionBlock>
        ) : null}
        <SectionBlock title="판단 결과 및 시사점">
          <p>{item.result}</p>
          <p className="mt-3">{item.keyTakeaway}</p>
        </SectionBlock>
        <SectionBlock title="유사 요소">
          <ul className="list-disc pl-5">
            {item.similarityFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock title="차이 요소">
          <ul className="list-disc pl-5">
            {item.differenceFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </SectionBlock>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">출처</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            {item.sourceLabel
              ? item.sourceLabel
              : `산업별 디자인분쟁 사례집, ${item.sourcePages.join(", ")}쪽`}
          </p>
          {item.sourceLinks?.length ? (
            <ul className="space-y-2">
              {item.sourceLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-700 underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

export function generateStaticParams() {
  return getAllCases().map((item) => ({
    id: item.id,
  }));
}
