"use client";

import Image from "next/image";
import { PawPrint } from "lucide-react";
import { useState } from "react";
import ThemedBanner from "@/components/server/themed/ThemedBanner";
import type { AboutArtwork, AboutMascot } from "@/lib/content/about";
import { withBasePath } from "@/lib/utils";

const PAW_HOOP =
  "/2027_images/new_themed_homepage_assets/styled-button-image.svg";

interface MascotShowcaseProps {
  mascots: AboutMascot[];
  communityPhoto: AboutArtwork;
}

/**
 * Scrapbook gallery + parchment plaque for the BAH mascots. The pill under the
 * plaque swaps the featured mascot, which in turn swaps the front polaroid.
 */
export default function MascotShowcase({
  mascots,
  communityPhoto,
}: MascotShowcaseProps) {
  const [index, setIndex] = useState(0);
  const active = mascots[index];
  const next = mascots[(index + 1) % mascots.length];

  return (
    <div className="about-mascots">
      <div className="about-mascots-gallery">
        <figure className="about-photo about-mascots-photo-back">
          <Image
            src={withBasePath(communityPhoto.src)}
            alt=""
            width={communityPhoto.width}
            height={communityPhoto.height}
            sizes="(max-width: 900px) 0px, 34vw"
            className="about-photo-image"
          />
        </figure>

        <figure className="about-photo about-mascots-photo-front">
          <Image
            key={active.id}
            src={withBasePath(active.art.src)}
            alt={active.art.alt}
            width={active.art.width}
            height={active.art.height}
            sizes="(max-width: 900px) 80vw, 44vw"
            className="about-photo-image"
          />
        </figure>

        <figure className="about-photo about-mascots-photo-bottom">
          <Image
            src={withBasePath(communityPhoto.src)}
            alt=""
            width={communityPhoto.width}
            height={communityPhoto.height}
            sizes="(max-width: 900px) 0px, 30vw"
            className="about-photo-image"
          />
        </figure>
      </div>

      <div className="about-mascots-card">
        <ThemedBanner
          title="Our Mascots"
          subtitle={active.name}
          caption={active.species}
          className="about-mascots-banner"
        />

        <p className="about-mascots-copy" aria-live="polite">
          {active.description}
        </p>

        <button
          type="button"
          className="themed-pill-action about-mascots-toggle"
          onClick={() => setIndex((value) => (value + 1) % mascots.length)}
          aria-label={`Show ${next.name}, the ${next.species}`}
        >
          <span className="themed-pill-paw" aria-hidden="true">
            <Image src={withBasePath(PAW_HOOP)} alt="" width={44} height={49} />
          </span>
          <span className="themed-pill-label">Who, {next.name}?</span>
          <PawPrint aria-hidden="true" className="about-mascots-toggle-tail" />
        </button>
      </div>
    </div>
  );
}
