"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";

function CarouselDots({ count }: { count: number }) {
  const { api } = useCarousel();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="registration-carousel-dots">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current}
          data-active={index === current}
          onClick={() => api?.scrollTo(index)}
          className="registration-carousel-dot"
        />
      ))}
    </div>
  );
}

/**
 * Tier cards: a three-column grid on desktop and the same swipeable carousel
 * used on the Code of Conduct page on mobile. Cards stay server-rendered and
 * are passed in as `items` so only the carousel ships to the client.
 */
export default function RegistrationTierCarousel({
  items,
}: {
  items: React.ReactNode[];
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <div className="registration-tiers">{items}</div>;
  }

  return (
    <Carousel className="registration-tiers-carousel" opts={{ loop: true }}>
      <CarouselContent className="-ml-3 p-3">
        {items.map((item, index) => (
          <CarouselItem key={index} className="basis-[88%] pl-3">
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="registration-tiers-controls">
        <CarouselPrevious className="static inset-auto translate-y-0" />
        <CarouselDots count={items.length} />
        <CarouselNext className="static inset-auto translate-y-0" />
      </div>
    </Carousel>
  );
}
