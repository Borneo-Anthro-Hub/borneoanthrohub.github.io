import { Accordion } from "@base-ui/react/accordion";
import Image from "next/image";
import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

type Faq = { question: string; answer: string };

const panelistFaqs: Faq[] = [
  {
    question: "Who can register as a Panelist?",
    answer:
      "Anyone may do so! We welcome any topics to be discussed, as long as you have a valid admission ticket for BAH 2026. A Panelist tag/sticker (or similar identification) will also be given to you on Collection Day.",
  },
  {
    question: "Does submitting a form guarantee a panel spot?",
    answer:
      "No. Panel submissions are manually reviewed and selected after discussion — no guarantees are promised. Accepted panelists will be notified by email, subject to schedule and venue availability. Please provide sufficient detail to help us understand your topic during review.",
  },
  {
    question: "Do I get to schedule or pick a venue for my panel?",
    answer:
      "Changes may be discussed, but all adjustments (time and venues) will be determined based on our availability to cater the proposed changes, if available.",
  },
  {
    question: "What are my responsibilities as a Panelist?",
    answer:
      "As a panelist, you are responsible for providing accurate and truthful information, ensuring panel content is lawful and respectful, and managing panel attendees fairly, ethically, and without discrimination.",
  },
  {
    question: "Can I collect personal data during my panel?",
    answer:
      "Yes, but not recommended. Should you choose to do so, you must ensure full compliance with the Personal Data Protection Act 2010 (PDPA 2010) and the Personal Data Protection (Amendment) Act 2024. With proper notice and consent, you may collect data for lawful purposes — never to misuse, sell, or retain data longer than necessary. Borneo Anthro Hub assumes no legal liability for your data collection activities.",
  },
  {
    question: "Who owns the content created for a panel?",
    answer:
      "You retain FULL ownership of your content, but grant us a non-exclusive, royalty-free license to host, store, and display the content for archival or operational purposes.",
  },
  {
    question:
      "Will BAH be responsible for disputes, losses or claims related to my panel?",
    answer:
      "No. BAH will not be responsible or liable for any disputes, misuse, indirect or consequential claims, or damages arising from panel activities or rule breaches. If your panel violates any rules, BAH reserves the right to suspend your panel or restrict panelist access without prior notice.",
  },
  {
    question: "Got concerns that are not covered here?",
    answer:
      "Write in to us at admin@borneoanthrohub.com and we'll address it as soon as possible.",
  },
];

const volunteerFaqs: Faq[] = [
  {
    question: "Who can apply as a Volunteer?",
    answer:
      "Any valid attendee of any tier (BAHpals A/S/SS) who wishes to lend a helping hand may register as a Volunteer for the convention. A separate instruction will be given to collect your identification.",
  },
  {
    question: "Does applying guarantee a selection?",
    answer:
      "No. Volunteer applications are manually reviewed and selected based on availability and suitability. Accepted volunteers will be notified by email with further details.",
  },
  {
    question: "Do I get a pick on my role or schedule for my duty?",
    answer:
      "BAH may assign or adjust roles, duty schedules, or work locations based on operational needs. Changes can be discussed if needed (if available), but volunteers are encouraged to stay contactable and on standby in case of urgent needs.",
  },
  {
    question: "What are my responsibilities as a Volunteer?",
    answer:
      "As a volunteer, you are expected to perform assigned duties responsibly and professionally; treat all attendees, fellow volunteers, and staff respectfully and fairly; uphold a safe, inclusive, and non-discriminatory environment at all times; and be punctual, contactable, and on standby (if reasonably available) for unforeseen emergencies.",
  },
  {
    question: "Can my Volunteer role be terminated?",
    answer:
      "Yes. BAH reserves the right to reassign, suspend, or terminate roles without prior notice if rules are breached or conduct is inappropriate, and to remove volunteers who fail to follow instructions or disrupt event operations. BAH will not be liable for personal disputes, losses, or damages arising from volunteer duties outside assigned duties or hours.",
  },
  {
    question: "Will Volunteers get anything?",
    answer:
      "Perks and incentives are not guaranteed and may vary year to year. However, we may offer a little gift as thanks for your helpful assistance, time, and effort during the convention operation.",
  },
];

function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion.Root className="mx-auto w-full">
      {faqs.map((faq, i) => (
        <Accordion.Item key={i} className="border-border border-b py-2">
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between py-2 text-left text-sm font-medium">
              {faq.question}
              <span className="text-muted-foreground ml-2 text-xs">
                +/&minus;
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="text-muted-foreground pb-3 text-xs leading-relaxed">
            {faq.answer}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center">
      <div className="border-border grow border-t" />
      <span className="text-muted-foreground mx-6 text-xs tracking-[0.5rem] uppercase">
        {label}
      </span>
      <div className="border-border grow border-t" />
    </div>
  );
}

export default function VolunteerPage() {
  requireFeature("volunteerApplication");

  return (
    <div className="flex flex-1 flex-col" id="volunteer">
      <PageHero
        eyebrow="Join the Team"
        title="BAH Clans Enrollment"
        description="Wanna be a part of us to make things even more BAHsome? Join a BAH clan today!"
      />

      <Section
        id="recruit"
        index="01"
        eyebrow="Recruitment"
        className="scroll-mt-16"
      >
        <p className="text-muted-foreground text-sm leading-relaxed">
          Recruitment for the BAH team opens closer to the convention. If
          you&rsquo;d like to be part of the crew that makes the festival happen
          &mdash; whether behind the scenes or on the ground &mdash; keep an eye
          on this page or follow us on social media for announcements.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          When recruitment opens, applications are handled through our external
          form. No prior experience is needed &mdash; just a positive attitude
          and a willingness to help.
        </p>
      </Section>

      <Section index="02" eyebrow="The Clans">
        <div className="grid gap-4 md:grid-cols-2">
          {/* The Shamans — Panelists */}
          <div className="border-border flex flex-col gap-4 rounded-lg border bg-[#54CCC9] p-6 text-[#373F52]">
            <div className="flex flex-col items-center text-center">
              <Image
                src={withBasePath("/2026_images/join_us/Panelist.svg")}
                alt="The Shamans"
                width={131}
                height={131}
                className="h-20 w-auto"
              />
              <h3 className="mt-3 text-xl font-bold uppercase">The Shamans</h3>
              <span className="mt-2 rounded-full bg-[#373F52] px-5 py-0.5 text-xs font-medium tracking-[4px] text-[#54CCC9] uppercase">
                Panelists
              </span>
            </div>
            <p className="text-justify text-sm leading-relaxed">
              The clan of the Shamans is well known for its wisdom and the
              unique talents of its members in various fields, and plays a key
              role in defining the myriad of programmes we will experience and
              enjoy during the festival.
              <br />
              <br />
              If you have the passion in sharing, skills, or experiences —
              whether it&rsquo;s about fursuiting, art, performance, fandom
              culture, or other creative topics — this is your chance to connect
              with fellow friends and spark engaging discussions. Both
              experienced speakers and first-time panelists are welcome.
              Let&rsquo;s be the change we want by sharing the knowledge we
              need.
              <br />
              <br />
              <i>
                * Upon registration, you are deemed to have read and agreed to
                be bound to our{" "}
                <a
                  className="text-blue-800 underline transition hover:text-blue-500 hover:decoration-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/document/d/1-i-UD9C4_nMaesIpqhu4F7saUWx-kTo6bpjSllY4Aus/"
                >
                  Panelist Registration T&amp;C
                </a>
                .
              </i>
            </p>
            <div className="mt-auto pt-4 text-center text-sm font-bold">
              <p>
                Deadline to register
                <br />
                2026-02-26 23:59 UTC+8
              </p>
              <span className="mt-2 inline-block rounded-full bg-[#373F52] px-5 py-1 text-xs text-[#54CCC9]">
                Registration Closed
              </span>
            </div>
          </div>

          {/* The Totem Bearers — Volunteers */}
          <div className="border-border flex flex-col gap-4 rounded-lg border bg-[#FFCB65] p-6 text-[#472B13]">
            <div className="flex flex-col items-center text-center">
              <Image
                src={withBasePath("/2026_images/join_us/Volunteer.svg")}
                alt="The Totem Bearers"
                width={131}
                height={131}
                className="h-20 w-auto"
              />
              <h3 className="mt-3 text-xl font-bold uppercase">
                The Totem Bearers
              </h3>
              <span className="mt-2 rounded-full bg-[#472B13] px-5 py-0.5 text-xs font-medium tracking-[4px] text-[#FFCB65] uppercase">
                Volunteers
              </span>
            </div>
            <p className="text-justify text-sm leading-relaxed">
              The Totem Bearers are the force and the beating heart of BAH, who
              have sworn to act as our sword and shield to ensure that the
              festival runs smoothly so that all BAHpals may enjoy it to the
              best.
              <br />
              <br />
              The Totem Bearers play the role of volunteers who support various
              parts of the event, from assisting attendees and managing activity
              areas to helping behind the scenes with event operations. No prior
              experience is needed — just a positive attitude and willingness to
              help. Be a part of our team and help our local con grow. Your help
              means the world to us.
              <br />
              <br />
              <i>
                * Upon registration, you are deemed to have read and agreed to
                be bound to our{" "}
                <a
                  className="text-blue-800 underline transition hover:text-blue-500 hover:decoration-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/document/d/1SMAefoAYJglk8pkhnrZnNHEj55AXFt6dX_nLdM67rAI/"
                >
                  Volunteer Registration T&amp;C
                </a>
                .
              </i>
            </p>
            <div className="mt-auto pt-4 text-center text-sm font-bold">
              <p>
                Deadline to register
                <br />
                2026-02-28 23:59 UTC+8
              </p>
              <span className="mt-2 inline-block rounded-full bg-[#472B13] px-5 py-1 text-xs text-[#FFCB65]">
                Registration Closed
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section index="03" eyebrow="Clans Enrollment FAQ" noBorder>
        <div className="mx-auto">
          <GroupDivider label="Panelist" />
          <FaqAccordion faqs={panelistFaqs} />

          <div className="py-6">
            <GroupDivider label="Volunteer" />
          </div>
          <FaqAccordion faqs={volunteerFaqs} />
        </div>
      </Section>
    </div>
  );
}
