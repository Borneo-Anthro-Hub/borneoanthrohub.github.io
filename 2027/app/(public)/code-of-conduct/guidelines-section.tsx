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
    <div className="group overflow-hidden rounded-lg border-2 border-dotted border-[#704323] bg-[#a76539] p-1.5 shadow-[0_4px_0_#704323,0_8px_14px_rgb(0_0_0_/_0.14)] transition-all duration-300">
      {g.image ? (
        <div className="relative aspect-square w-full border border-[#704323]/40 bg-[#f3e4c5]">
          <Image
            src={withBasePath(g.image)}
            alt={g.title}
            fill
            sizes="(max-width: 640px) 85vw, 50vw"
            className="object-contain"
          />
        </div>
      ) : (
        <div className="relative aspect-square w-full border border-[#704323]/40 bg-[#f3e4c5]">
          <PlaceholderImage />
        </div>
      )}
      <div className="relative mt-1.5 flex h-full items-start gap-3 overflow-hidden border border-[#704323]/40 bg-linear-to-br from-[#e3b77f] via-[#cf9258] to-[#dfad72] p-4 text-[#3f2a1a]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-[#fff0c7]/35 blur-2xl"
        />
        <span className="relative mt-0.5 shrink-0 border border-dotted border-[#704323] bg-[#f4dfb9] px-1.5 py-0.5 font-mono text-[10px] text-[#50331e]">
          {String(g.rule).padStart(2, "0")}
        </span>
        <div className="relative">
          <p className="type-body-l-semibold">{g.title}</p>
          <p className="type-body-s mt-1 text-[#503b2a]">{g.text}</p>
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
        <CarouselContent className="-ml-3">
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
