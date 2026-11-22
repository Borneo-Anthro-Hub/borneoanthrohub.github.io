import ThemedAccordion from "@/components/server/themed/ThemedAccordion";
import { cn } from "@/lib/utils";

export interface ThemedFaqItem {
  question: string;
  answer: React.ReactNode;
}

interface ThemedFaqProps {
  items: readonly ThemedFaqItem[];
  className?: string;
}

/** Shared FAQ accordion used across tickets and reusable content pages. */
export default function ThemedFaq({ items, className }: ThemedFaqProps) {
  return <ThemedAccordion items={items} className={cn("w-full", className)} />;
}
