import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import AboutReadMore from "@/components/client/about/AboutReadMore";
import MascotShowcase from "@/components/client/about/MascotShowcase";
import PageHero from "@/components/server/layout/PageHero";
import SocialLinks from "@/components/server/layout/SocialLinks";
import ThemedBanner from "@/components/server/themed/ThemedBanner";
import {
  aboutCommunityPhoto,
  aboutContact,
  aboutMascots,
  aboutStory,
} from "@/lib/content/about";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

/** Community snapshots stacked on the board's right-hand side. */
const communitySnapshots = [
  "about-snapshot-1",
  "about-snapshot-2",
  "about-snapshot-3",
];

export default function AboutPage() {
  requireFeature("aboutUs");

  return (
    <div
      className="themed-home about-page flex flex-1 flex-col"
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
        <div className="about-board">
          <div className="about-board-texture" aria-hidden="true" />
          <div className="about-board-foliage" aria-hidden="true" />

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
              {communitySnapshots.map((snapshot) => (
                <figure key={snapshot} className={`about-photo ${snapshot}`}>
                  <Image
                    src={withBasePath(aboutCommunityPhoto.src)}
                    alt=""
                    width={aboutCommunityPhoto.width}
                    height={aboutCommunityPhoto.height}
                    sizes="(max-width: 900px) 80vw, 26vw"
                    className="about-photo-image"
                  />
                </figure>
              ))}
            </div>

            <AboutReadMore paragraphs={aboutStory.paragraphs} />

            <div id="contact" className="about-contact">
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
            </div>
          </div>
        </div>
      </section>

      {/* OUR MASCOTS — scrapbook gallery + swap-the-mascot plaque */}
      <section
        id="mascots"
        className="about-mascots-section"
        aria-label="Our Mascots"
      >
        <MascotShowcase
          mascots={aboutMascots}
          communityPhoto={aboutCommunityPhoto}
        />
      </section>
    </div>
  );
}
