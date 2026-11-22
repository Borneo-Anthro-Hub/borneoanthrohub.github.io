import RegistrationUnderline from "@/components/server/registration/RegistrationUnderline";
import ThemedAccordion from "@/components/server/themed/ThemedAccordion";

const faqs = [
  {
    question: "How do I purchase a BAH Entry Ticket?",
    answer:
      "Select one of the three tiers above and click “Accept this Invitation”. You will be redirected to our dedicated Google Form to complete your registration and payment.",
  },
  {
    question: "New Age Requirement, am I still eligible?",
    answer: (
      <>
        <p>
          As of BAH 2027, it has been marked as an 18+ convention (but remains
          strictly Safe For Work), all participants are still eligible as long
          as the participant is 18 and or above on the commencement of the
          convention day itself.
        </p>
        <p className="mt-2">
          Please note that the Date of Birth is required for us to validate your
          entry during both Ticket Registration or Con-Collection on the event
          day itself.
        </p>
      </>
    ),
  },
  {
    question: "Can I customize my con badge?",
    answer:
      "Yes! You can update your information in the Convention Profile Form linked in your confirmation email. Certain options are available exclusively for Gardeners and Caretakers.",
  },
  {
    question: "Do I get a confirmation when my registration has gone through?",
    answer: (
      <>
        <p>
          Yes! Once your submission has been verified, you will receive a
          Confirmation Email within 72 hours, along with the link to your
          Convention Profile Form.
        </p>
        <p className="mt-2">
          For international participants or payments made via Wise, verification
          may take longer due to geographical or local governance restrictions.
          Rest assured, your ticket will be reserved while we wait for the
          payment to be cleared.
        </p>
      </>
    ),
  },
  {
    question: "Are the tickets refundable or transferable?",
    answer:
      "Tickets are non-refundable. Transfers are available if you inform us before the cut-off date (3 months before the convention).",
  },
  {
    question: "Is there any walk-in registration?",
    answer: (
      <>
        <p>
          As of now, no walk-in registration is announced or guaranteed, and it
          is subject to change without prior announcement.
        </p>
        <p className="mt-2">
          We advise all participants to register online before the cut-off date
          to secure your spot early.
        </p>
      </>
    ),
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
    <ThemedAccordion
      items={faqs}
      className="registration-faq"
      panelDivider={
        <RegistrationUnderline className="registration-faq-underline" />
      }
    />
  );
}
