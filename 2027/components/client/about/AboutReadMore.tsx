"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { withBasePath } from "@/lib/utils";

interface AboutReadMoreProps {
  paragraphs: string[];
}

/**
 * Story copy for the community board. Narrow screens clamp the paragraphs to
 * a few lines behind a "See More" pill; the toggle is hidden from md upwards,
 * where the full story is always visible.
 */
export default function AboutReadMore({ paragraphs }: AboutReadMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const copyId = useId();

  return (
    <div className="about-copy">
      <div
        id={copyId}
        className="about-copy-text"
        data-expanded={expanded ? "true" : "false"}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <button
        type="button"
        className="themed-pill-action about-copy-toggle"
        aria-expanded={expanded}
        aria-controls={copyId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="themed-pill-paw" aria-hidden="true">
          <Image
            src={withBasePath(
              "/2027_images/new_themed_homepage_assets/styled-button-image.svg",
            )}
            alt=""
            width={44}
            height={49}
          />
        </span>
        <span className="themed-pill-label">
          {expanded ? "See Less" : "See More"}
        </span>
      </button>
    </div>
  );
}
