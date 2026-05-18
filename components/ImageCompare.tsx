import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { CaseImages } from "@/types/case";

export function ImageCompare({ images }: { images: CaseImages }) {
  const panels = [
    { label: "원고 디자인", url: images.plaintiffDesign },
    { label: "피고 디자인", url: images.defendantDesign },
    { label: "비교 이미지", url: images.comparisonImage },
  ].filter((item) => Boolean(item.url));

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {panels.map((image) => (
        <Card key={image.label} className="overflow-hidden">
          <div className="relative h-64 w-full bg-slate-100 sm:h-72">
            <Image
              src={image.url!}
              alt={image.label}
              fill
              unoptimized
              className="object-contain bg-slate-50"
            />
          </div>
          <div className="border-t border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
            {image.label}
          </div>
        </Card>
      ))}
    </div>
  );
}
