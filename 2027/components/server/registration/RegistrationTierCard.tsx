import Image from "next/image";
import { RegistrationTierAction } from "@/components/client/registration/TicketStatus";
import { withBasePath } from "@/lib/utils";

export interface RegistrationTierItem {
  label: string;
  /** 1 = base goodies, 2 = sponsor extras, 3 = caretaker exclusives. */
  level: 1 | 2 | 3;
}

export interface RegistrationTierSection {
  /** Omit for a continued group — the divider alone starts the next block. */
  title?: string;
  items: RegistrationTierItem[];
}

const CARD_ASSETS = "/2027_images/registration_page/card";
const SECTION_DIVIDER = `${CARD_ASSETS}/goodies_info_divider.svg`;
const LIST_BULLET = `${CARD_ASSETS}/price_info_diamond_bullet.svg`;

export interface RegistrationTier {
  id: "wanderer" | "gardener" | "caretaker";
  name: string;
  price: string;
  description: string;
  card: string;
  icon: string;
  sections: RegistrationTierSection[];
}

export default function RegistrationTierCard({
  tier,
}: {
  tier: RegistrationTier;
}) {
  return (
    <article
      className="registration-tier"
      data-tier={tier.id}
      style={
        {
          backgroundImage: `url("${withBasePath(tier.card)}")`,
          "--registration-tier-divider": `url("${withBasePath(SECTION_DIVIDER)}")`,
          "--registration-tier-bullet": `url("${withBasePath(LIST_BULLET)}")`,
        } as React.CSSProperties
      }
    >
      <div className="registration-tier-content">
        <h3 className="registration-tier-name">{tier.name}</h3>
        <p className="registration-tier-price">{tier.price}</p>

        <Image
          src={withBasePath(tier.icon)}
          alt=""
          width={1488}
          height={1488}
          className="registration-tier-icon"
        />

        <p className="registration-tier-description">{tier.description}</p>

        {tier.sections.map((section, sectionIndex) => (
          <div className="registration-tier-section" key={sectionIndex}>
            {section.title ? (
              <p className="registration-tier-section-title">{section.title}</p>
            ) : (
              <div
                className="registration-tier-section-rule"
                aria-hidden="true"
              >
                <span className="registration-tier-section-divider" />
              </div>
            )}
            <ul className="registration-tier-list">
              {section.items.map((item) => (
                <li className="registration-tier-item" key={item.label}>
                  <span className="registration-tier-dots" aria-hidden="true">
                    {Array.from({ length: item.level }, (_, index) => (
                      <span className="registration-tier-dot" key={index} />
                    ))}
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <RegistrationTierAction
          id={tier.id}
          name={tier.name}
          price={tier.price}
        />
      </div>
    </article>
  );
}
