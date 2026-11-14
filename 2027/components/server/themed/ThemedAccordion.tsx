import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemedAccordionItem {
  question: string;
  answer: React.ReactNode;
}

interface ThemedAccordionProps {
  items: readonly ThemedAccordionItem[];
  className?: string;
}

export default function ThemedAccordion({
  items,
  className,
}: ThemedAccordionProps) {
  return (
    <Accordion.Root className={cn("themed-accordion", className)}>
      {items.map((item) => (
        <Accordion.Item className="themed-accordion-item" key={item.question}>
          <Accordion.Header>
            <Accordion.Trigger className="themed-accordion-trigger">
              <span>{item.question}</span>
              <span className="themed-accordion-icon" aria-hidden="true">
                <ChevronDown className="themed-accordion-chevron" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="themed-accordion-panel">
            {item.answer}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
