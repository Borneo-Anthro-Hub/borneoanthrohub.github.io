import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import AboutReadMore from "@/components/client/about/AboutReadMore";
import MascotShowcase from "@/components/client/about/MascotShowcase";
import PageHero from "@/components/server/layout/PageHero";
import SocialLinks from "@/components/server/layout/SocialLinks";
import ThemedBanner from "@/components/server/themed/ThemedBanner";
import ThemedCard from "@/components/server/themed/ThemedCard";
import {
  aboutCommunityPhoto,
  aboutContact,
  aboutMascots,
  aboutStory,
} from "@/lib/content/about";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

/** Flower sprigs tucked behind the community polaroid. */
const SNAPSHOT_SPRIGS = [
  {
    src: "/2027_images/flowers/Group 1795.svg",
    width: 333,
    height: 375,
    className: "about-snapshot-sprig-top",
  },
  {
    src: "/2027_images/flowers/Group 1806.svg",
    width: 327,
    height: 277,
    className: "about-snapshot-sprig-bottom",
  },
];

/** Foliage that closes off the community board and the mascots section. */
const CARD_TREE_ART = {
  src: "/2027_images/about/tree_bottom_card.svg",
  width: 1520,
  height: 1041,
};

const SECTION_TREE_ART = {
  src: "/2027_images/about/tree_bottom_left.svg",
  width: 1920,
  height: 1582,
};

export default function AboutPage() {
  requireFeature("aboutUs");

  return (
    <div
      className="themed-home about-page flex flex-1 scroll-mt-20 flex-col"
      id="organization"
    >
      <PageHero
        eyebrow="About"
        title="About Us"
        description="Get to know us more!"
        showDescription
      />

      {/* OUR COMMUNITY — parchment story board + contact plaque */}
      <section
        className="about-community"
        aria-labelledby="about-community-title"
      >
        <ThemedCard className="about-board">
          <div className="about-board-foliage" aria-hidden="true">
            <Image
              src={withBasePath(CARD_TREE_ART.src)}
              alt=""
              width={CARD_TREE_ART.width}
              height={CARD_TREE_ART.height}
              sizes="(max-width: 900px) 110vw, 1300px"
              className="about-board-foliage-art"
            />
          </div>

          <div className="about-board-inner">
            <ThemedBanner
              id="about-community-title"
              title={aboutStory.banner.title}
              subtitle={aboutStory.banner.subtitle}
              className="about-banner"
            />

            <blockquote className="about-quote">
              &ldquo;{aboutStory.quote}&rdquo;
            </blockquote>

            <div className="about-snapshots">
              {SNAPSHOT_SPRIGS.map((sprig) => (
                <span
                  key={sprig.src}
                  className={`about-snapshot-sprig ${sprig.className}`}
                  aria-hidden="true"
                >
                  <Image
                    src={withBasePath(sprig.src)}
                    alt=""
                    width={sprig.width}
                    height={sprig.height}
                  />
                </span>
              ))}

              <figure className="about-photo about-snapshot">
                <Image
                  src={withBasePath(aboutCommunityPhoto.src)}
                  alt={aboutCommunityPhoto.alt}
                  width={aboutCommunityPhoto.width}
                  height={aboutCommunityPhoto.height}
                  sizes="(max-width: 900px) 88vw, 32vw"
                  className="about-photo-image"
                />
                {aboutCommunityPhoto.caption && (
                  <figcaption className="about-snapshot-caption">
                    {aboutCommunityPhoto.caption}
                  </figcaption>
                )}
              </figure>
            </div>

            <AboutReadMore paragraphs={aboutStory.paragraphs} />

            <ThemedCard id="contact" className="about-contact">
              <h2 className="about-contact-title">{aboutContact.heading}</h2>
              <p className="about-contact-subtitle">
                {aboutContact.subheading}
              </p>

              <div className="about-contact-inner">
                <Link
                  href={`mailto:${aboutContact.email}`}
                  className="about-contact-row"
                >
                  <Mail aria-hidden="true" />
                  <span>{aboutContact.email}</span>
                </Link>

                <p className="about-contact-row">
                  <MapPin aria-hidden="true" />
                  <span>{aboutContact.location}</span>
                </p>

                <p className="about-contact-row">
                  <span className="about-contact-social">
                    <SocialLinks linkClassName="about-contact-social-link" />
                  </span>
                  <span>{aboutContact.handle}</span>
                </p>
              </div>
            </ThemedCard>
          </div>
        </ThemedCard>
      </section>

      {/* OUR MASCOTS — scrapbook gallery + swap-the-mascot plaque */}
      <section
        id="mascots"
        className="about-mascots-section scroll-mt-20"
        aria-label="Our Mascots"
      >
        <div className="about-mascots-tree" aria-hidden="true">
          <Image
            src={withBasePath(SECTION_TREE_ART.src)}
            alt=""
            width={SECTION_TREE_ART.width}
            height={SECTION_TREE_ART.height}
            sizes="100vw"
            className="about-mascots-tree-art"
          />
        </div>
        <MascotShowcase mascots={aboutMascots} />
      </section>
    </div>
  );
}
