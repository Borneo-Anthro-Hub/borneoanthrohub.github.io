/**
 * The `card-underline.svg` leaf, mapped out as a row of shapes instead of a
 * repeated CSS background. The path is the asset's own `d` on a 10×6 canvas.
 */
const LEAF_PATH =
  "M10.002 1.19995C8.9018 3.19995 7.10144 4.90015 5.00101 5.90015C2.90059 4.90015 1.10022 3.29995 0 1.19995C1.5003 0.399951 3.20065 0 5.00101 0C6.80138 0 8.50172 0.399951 10.002 1.19995Z";

const LEAF_WIDTH = 10;
const LEAF_HEIGHT = 6;
/** Breathing room between leaves, in the asset's 10×6 unit space. */
const LEAF_GAP = 4;
const LEAF_PITCH = LEAF_WIDTH + LEAF_GAP;
const LEAF_ID = "registration-underline-leaf";

export default function RegistrationUnderline({
  count = 19,
}: {
  count?: number;
}) {
  const width = count * LEAF_PITCH - LEAF_GAP;
  return (
    <svg
      className="registration-board-underline"
      viewBox={`0 0 ${width} ${LEAF_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id={LEAF_ID} d={LEAF_PATH} />
      </defs>
      {Array.from({ length: count }, (_, index) => (
        <use
          key={index}
          href={`#${LEAF_ID}`}
          x={index * LEAF_PITCH}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
