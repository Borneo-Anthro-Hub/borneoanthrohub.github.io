import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function TravelPage() {
  requireFeature("travelInformation");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Getting Here"
        title="Travel Information"
        description="Everything you need to know about getting to Kota Kinabalu."
      />

      <Section index="01" eyebrow="International Travelers Guide">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Welcome to Sabah, &ldquo;The Land Below the Wind&rdquo; &mdash; calm
          tropical climate, rainforests, diverse wildlife, mountain landscapes
          and remote islands.
        </p>
      </Section>

      <Section index="02" eyebrow="Entry &amp; Visa Requirements">
        <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
          <li>
            <strong className="text-foreground">
              West Malaysians / Locals:
            </strong>{" "}
            No visa needed. MyKad required. Journey/Visit Pass Slip issued for
            up to 90 days.
          </li>
          <li>
            <strong className="text-foreground">Foreign Nationals:</strong>{" "}
            Check eligibility at the official Malaysia immigration portal.
          </li>
          <li>
            <strong className="text-foreground">Passport validity:</strong> Must
            be valid for at least 6 months on arrival.
          </li>
          <li>
            <strong className="text-foreground">MDAC:</strong> All travellers
            (except Singapore citizens) must complete the Malaysia Digital
            Arrival Card within 3 days prior to arrival.
          </li>
        </ul>
      </Section>

      <Section index="03" eyebrow="Customs Declarations">
        <ol className="text-muted-foreground list-inside list-decimal space-y-2 text-sm">
          <li>All dutiable or prohibited goods must be declared.</li>
          <li>Pork products are not allowed in or out of the state.</li>
          <li>Fresh produce is not allowed into the state.</li>
          <li>
            Cannot bring cash exceeding USD 10,000 (or equivalent) without BNM
            approval.
          </li>
          <li>
            Penalties for non-compliance: up to RM 3 million fine or 5 years
            imprisonment.
          </li>
        </ol>
      </Section>

      <Section index="04" eyebrow="Travel Logistics" noBorder>
        <div className="text-muted-foreground grid gap-2 text-sm">
          <p>
            <strong className="text-foreground">Airport:</strong> KKIA (BKI)
            &mdash; Kota Kinabalu International Airport
          </p>
          <p>
            <strong className="text-foreground">Timezone:</strong> GMT+8
          </p>
          <p>
            <strong className="text-foreground">Arrival:</strong> Arrive
            2&ndash;3 hours before domestic flights, 3&ndash;4 hours for
            international.
          </p>
          <p>
            <strong className="text-foreground">Power:</strong> Type-G plugs,
            240V / 50Hz.
          </p>
        </div>
      </Section>
    </div>
  );
}
