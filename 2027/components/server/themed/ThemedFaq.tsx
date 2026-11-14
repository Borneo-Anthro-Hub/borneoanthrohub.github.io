import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemedFaqItem {
  question: string;
  answer: React.ReactNode;
}

interface ThemedFaqProps {
  items: readonly ThemedFaqItem[];
  className?: string;
}

/**
 * Token-based FAQ accordion shared by the reusable content pages (clans
 * enrollment, venue, guides). Unlike `RegistrationFaq` it carries no
 * year-specific artwork, so yearly themes only change colors and fonts.
 */
export default function ThemedFaq({ items, className }: ThemedFaqProps) {
  return (
    <Accordion.Root className={cn("w-full", className)}>
      {items.map((item) => (
        <Accordion.Item
          key={item.question}
          className="border-border border-b first:border-t"
        >
          <Accordion.Header>
            <Accordion.Trigger className="font-body text-foreground flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold">
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-150 data-[panel-open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="font-body text-foreground/75 pb-4 text-sm leading-relaxed">
            {item.answer}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
