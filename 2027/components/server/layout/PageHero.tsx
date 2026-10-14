import Image from "next/image";
import WireframeFrame from "@/components/server/layout/WireframeFrame";
import { withBasePath } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  index?: string;
  showIndex?: boolean;
  showEyebrow?: boolean;
  showDescription?: boolean;
  titleClassName?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  showDescription = false,
  showIndex = false,
  showEyebrow = false,
  index = "00",
  titleClassName = "text-3xl font-bold",
}: PageHeroProps) {
  return (
    <section className="border-border relative isolate overflow-hidden border-b px-4 py-10 md:px-8">
      <Image
        src={withBasePath(
          "/2027_images/landscape_main_art_airashi/background_art.png",
        )}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="bg-background/60 absolute inset-0" />
      <WireframeFrame className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-4 p-6 text-center lg:whitespace-nowrap">
        <div className="flex items-center gap-2">
          {showIndex && (
            <span className="border-border text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px]">
              {index}
            </span>
          )}
          {showEyebrow && (
            <p className="text-muted-foreground text-xs tracking-widest uppercase">
              {eyebrow}
            </p>
          )}
        </div>
        <h1 className={titleClassName}>{title}</h1>
        {showDescription && description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </WireframeFrame>
    </section>
  );
}
