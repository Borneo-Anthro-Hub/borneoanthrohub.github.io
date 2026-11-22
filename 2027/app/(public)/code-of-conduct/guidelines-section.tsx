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

const CARD_BACKGROUND = withBasePath("/2027_images/card_bg.svg");

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
    <div className="flex items-center">
      {guidelines.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current ? "true" : undefined}
          onClick={() => api?.scrollTo(i)}
          className="grid h-6 w-6 place-items-center rounded-full"
        >
          <span
            aria-hidden="true"
            className={`block rounded-full transition-all ${
              i === current
                ? "bg-foreground h-2 w-2"
                : "bg-foreground/30 h-1.5 w-1.5"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function GuidelineCard({ g }: { g: (typeof guidelines)[number] }) {
  return (
    // The artwork supplies the card surface, so it is stretched to the card
    // box rather than clipped the way a cover image would be. The grid spacer
    // maintains its portrait proportions without preventing content growth.
    <article
      className="group relative grid min-h-full bg-no-repeat drop-shadow-[0_6px_8px_rgb(45_35_24_/_0.3)] transition-transform duration-300 before:col-start-1 before:row-start-1 before:aspect-[277/426] before:w-full before:content-[''] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{
        backgroundImage: `url("${CARD_BACKGROUND}")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="col-start-1 row-start-1 flex flex-col p-[clamp(24px,10%,40px)]">
        <div className="relative min-h-32 w-full flex-1 overflow-hidden rounded-xl">
          {g.image ? (
            <Image
              src={withBasePath(g.image)}
              alt={g.title}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        <div className="mt-auto p-6 pt-6">
          <p className="type-body-l-semibold text-brand-text leading-tight text-pretty">
            {g.title}
          </p>
          <p className="type-body-s text-brand-text mt-2 leading-relaxed text-pretty">
            {g.text}
          </p>
        </div>
      </div>
    </article>
  );
}

export function GuidelinesSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-4 p-4">
          {guidelines.map((g) => (
            <CarouselItem key={g.rule} className="basis-[85%] pl-4">
              <GuidelineCard g={g} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex items-center justify-center gap-2">
          <CarouselPrevious className="static inset-auto translate-y-0" />
          <CarouselDots />
          <CarouselNext className="static inset-auto translate-y-0" />
        </div>
      </Carousel>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {guidelines.map((g) => (
        <div
          key={g.rule}
          className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
        >
          <GuidelineCard g={g} />
        </div>
      ))}
    </div>
  );
}
