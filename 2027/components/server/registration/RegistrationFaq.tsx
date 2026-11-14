import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I purchase a BAH Entry Ticket?",
    answer:
      "Select one of the three tiers above and click “Accept this Invitation”. You will be redirected to our dedicated Google Form to complete your registration and payment.",
  },
  {
    question: "Can I customize my con badge?",
    answer:
      "Yes! You can update your information in the Convention Profile Form linked in your confirmation email. Certain options are available exclusively for Gardeners and Caretakers.",
  },
  {
    question: "Do I get a confirmation when my registration has gone through?",
    answer:
      "Yes! Once your submission has been verified, you will receive a Confirmation Email within 72 hours, along with the link to your Convention Profile Form.",
  },
  {
    question: "Are the tickets refundable or transferable?",
    answer:
      "Tickets are non-refundable. Transfers are available if you inform us before the cut-off date (3 months before the convention).",
  },
  {
    question: "Is there any walk-in registration?",
    answer:
      "There is no walk-in registration. All attendees must register online before the cut-off date, so please secure your pass early.",
  },
  {
    question:
      "Got concerns that are not covered in either the Guide or the FAQ Section?",
    answer:
      "Reach out to us at admin@borneoanthrohub.com and our team will be happy to help.",
  },
];

export default function RegistrationFaq() {
  return (
    <Accordion.Root className="registration-faq">
      {faqs.map((faq) => (
        <Accordion.Item className="registration-faq-item" key={faq.question}>
          <Accordion.Header>
            <Accordion.Trigger className="registration-faq-trigger">
              <span>{faq.question}</span>
              <span className="registration-faq-icon" aria-hidden="true">
                <ChevronDown className="registration-faq-chevron" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="registration-faq-panel">
            {faq.answer}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
