import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ThemedPillLink from "@/components/server/themed/ThemedPillLink";
import { withBasePath } from "@/lib/utils";

export interface RegistrationTierItem {
  label: string;
  /** 1 = base goodies, 2 = sponsor extras, 3 = caretaker exclusives. */
  level: 1 | 2 | 3;
}

export interface RegistrationTierSection {
  title: string;
  items: RegistrationTierItem[];
}

export interface RegistrationTier {
  id: "wanderer" | "gardener" | "caretaker";
  name: string;
  price: string;
  description: string;
  card: string;
  icon: string;
  formUrl: string;
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
      style={{
        backgroundImage: `url("${withBasePath(tier.card)}")`,
      }}
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

        {tier.sections.map((section) => (
          <div className="registration-tier-section" key={section.title}>
            <p className="registration-tier-section-title">{section.title}</p>
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

        <ThemedPillLink
          href={tier.formUrl}
          label="Accept this Invitation"
          ariaLabel={`Register for the ${tier.name} tier (${tier.price})`}
          className="registration-tier-cta"
          tail={<ChevronRight aria-hidden="true" />}
        />
      </div>
    </article>
  );
}
