"use client";

import * as React from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { withBasePath } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";

const guidelines = [
  {
    rule: 1,
    title: "Badge Required",
    text: "Always wear your designated badge within con spaces.",
    image: "/2027_images/guideline_latest/1.png",
  },
  {
    rule: 2,
    title: "Stay Healthy",
    text: "If you feel unwell, please quarantine, wear a mask, and maintain distance.",
    image: "/2027_images/guideline_latest/2.png",
  },
  {
    rule: 3,
    title: "Dress Code",
    text: "Dress appropriately. Explicit or indecent attire is not permitted.",
    image: "/2027_images/guideline_latest/3.png",
  },
  {
    rule: 4,
    title: "No Smoking",
    text: "Smoking or vaping is not permitted within con spaces or hotel premises.",
    image: "/2027_images/guideline_latest/4.png",
  },
  {
    rule: 5,
    title: "Prop Policy",
    text: "Imitation weaponry or props must be approved by the Security Team.",
    image: "/2027_images/guideline_latest/5.png",
  },
  {
    rule: 6,
    title: "No Contraband",
    text: "Contraband or being under the influence of one may result in ejection.",
    image: "/2027_images/guideline_latest/6.png",
  },
  {
    rule: 7,
    title: "Respect Property",
    text: "Avoid vandalizing hotel property. Damage will be held accountable.",
    image: "/2027_images/guideline_latest/7.png",
  },
  {
    rule: 8,
    title: "Fursuit Lounge",
    text: "No photography or videography within the Fursuit Lounge.",
    image: "/2027_images/guideline_latest/8.png",
  },
  {
    rule: 9,
    title: "No Harassment",
    text: "Harassment of any kind will not be tolerated.",
    image: "/2027_images/guideline_latest/9.png",
  },
  {
    rule: 10,
    title: "Need Help?",
    text: "Seek assistance at the Con Ops Room for support or inquiries.",
    image: "/2027_images/guideline_latest/10.png",
  },
];

function PlaceholderImage() {
  return (
    <div className="bg-muted flex h-full w-full items-center justify-center">
      <svg
        className="text-muted-foreground/40 h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
    </div>
  );
}

function CarouselDots() {
  const { api } = useCarousel();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex items-center gap-1.5">
      {guidelines.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => api?.scrollTo(i)}
          className={`rounded-full transition-all ${
            i === current
              ? "bg-foreground h-2 w-2"
              : "bg-foreground/30 h-1.5 w-1.5"
          }`}
        />
      ))}
    </div>
  );
}

function GuidelineCard({ g }: { g: (typeof guidelines)[number] }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[20px] border border-[#7a4a2d]/80 bg-[#cf955a] p-2 shadow-[0_6px_0_#72462d,0_10px_18px_rgba(65,38,20,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_0_#72462d,0_12px_20px_rgba(65,38,20,0.14)]">
      <div className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#72462d]/80 bg-[#f2dfb9]">
        {g.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7eedf]">
            <Image
              src={withBasePath(g.image)}
              alt={g.title}
              fill
              sizes="(max-width: 640px) 85vw, 50vw"
              className="object-contain p-4"
            />
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7eedf]">
            <PlaceholderImage />
          </div>
        )}

        <div className="flex min-h-[150px] flex-1 items-stretch gap-3 bg-[#d8a96f] p-3 text-[#3e2a18]">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p className="type-body-l-semibold text-[#2f1d12]">{g.title}</p>
            <p className="type-body-s mt-1 leading-relaxed text-[#563d2a]">
              {g.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GuidelinesSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-3 p-3">
          {guidelines.map((g) => (
            <CarouselItem key={g.rule} className="basis-[85%] pl-3">
              <GuidelineCard g={g} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex items-center justify-center gap-3">
          <CarouselPrevious className="static inset-auto translate-y-0" />
          <CarouselDots />
          <CarouselNext className="static inset-auto translate-y-0" />
        </div>
      </Carousel>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {guidelines.map((g) => (
        <GuidelineCard key={g.rule} g={g} />
      ))}
    </div>
  );
}
