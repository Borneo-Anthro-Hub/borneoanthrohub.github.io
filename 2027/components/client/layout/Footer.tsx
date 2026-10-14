"use client";

import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/server/layout/SocialLinks";
import { navItems } from "@/lib/nav/site-nav";
import { useSiteState } from "@/components/client/SiteStateProvider";
import { Mail } from "lucide-react";
import { withBasePath } from "@/lib/utils";

const archiveYears = [
  {
    year: 2026,
    link: "https://borneoanthrohub.com/2026/",
  },
];

const columnHeadingClassName =
  "type-caption-s-bold text-brand-text/100 mb-3 tracking-wide uppercase";
const footerLinkClassName =
  "type-body-s text-brand-accent/90 hover:text-brand-accent underline decoration-brand-accent/40 underline-offset-2 transition-colors";

/** A single footer nav link, with an optional leading bullet dot. */
function FooterListItem({
  href,
  label,
  showBullet = true,
}: {
  href: string;
  label: string;
  showBullet?: boolean;
}) {
  return (
    <li className="flex items-start gap-1.5">
      {showBullet && (
        <span
          aria-hidden="true"
          className="bg-brand-accent mt-1.75 h-1 w-1 shrink-0 rounded-full"
        />
      )}
      <Link href={href} className={footerLinkClassName}>
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const { isEnabled } = useSiteState();
  const currentYear = new Date().getFullYear();
  const visibleNavItems = navItems.filter(
    (item) => !item.feature || isEnabled(item.feature),
  );

  return (
    <footer className="bg-brand-surface text-brand-text border-brand-secondary/30 border-t pb-10">
      <div className="flex w-full justify-center">
        <div className="mx-auto flex flex-col gap-10 px-4 py-10 md:px-8">
          {/* ---- Top row: Brand/contact + nav sitemap ---- */}
          <div className="flex flex-col items-start gap-10 text-start lg:flex-row lg:justify-between">
            {/* Brand — placeholder asset from public/2027_images, swap when final branding lands */}
            <div className="flex flex-col items-start gap-4 lg:w-64 lg:shrink-0">
              <div className="relative h-15 w-30">
                <Image
                  src={withBasePath("/2027_images/BAH_logo_footer.svg")}
                  alt="Borneo Anthro Hub"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h4 className="type-caption-s-bold text-brand-accent/90 mb-3 tracking-wide uppercase">
                  Let&rsquo;s get in Touch!
                </h4>
                {/* Social icons */}
                <div className="mb-3 flex items-center justify-start gap-3">
                  <SocialLinks />
                </div>
                {/* Email */}
                <p className="type-body-s text-brand-text/100">Email us at</p>
                <a
                  href="mailto:admin@borneoanthrohub.com"
                  className="type-body-s text-brand-accent/90 hover:text-brand-accent decoration-brand-accent/40 inline-flex items-center gap-1.5 underline underline-offset-2 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>admin@borneoanthrohub.com</span>
                </a>
              </div>
            </div>

            {/* Sitemap */}
            <div className="flex w-full flex-col items-start gap-8">
              {/* Archive — spans the full row */}
              <div className="w-full">
                <h6 className={columnHeadingClassName}>Archive</h6>
                <ul className="flex flex-wrap justify-start gap-x-4 gap-y-1.5">
                  {archiveYears.map((archive) => (
                    <FooterListItem
                      key={archive.year}
                      href={archive.link}
                      label={String(archive.year)}
                      showBullet={false}
                    />
                  ))}
                </ul>
              </div>

              {/* Nav categories, mirroring the header's nav structure */}
              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {visibleNavItems.map((item) => {
                  const links = (
                    item.children?.length ? item.children : [item]
                  ).filter(
                    (child) => !child.feature || isEnabled(child.feature),
                  );
                  if (links.length === 0) return null;
                  return (
                    <div key={item.href}>
                      <h6 className={columnHeadingClassName}>{item.label}</h6>
                      <ul className="flex flex-col items-start gap-1.5">
                        {links.map((child) => (
                          <FooterListItem
                            key={child.href}
                            href={child.href}
                            label={child.label}
                          />
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---- Bottom row: copyright ---- */}
          <div className="border-brand-text/15 border-t pt-4 text-center">
            <p className="type-caption-s-medium text-brand-text/50">
              &copy; {currentYear} Borneo Anthro Hub. All logos, images and
              related intellectual property rights belong to their respective
              owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
