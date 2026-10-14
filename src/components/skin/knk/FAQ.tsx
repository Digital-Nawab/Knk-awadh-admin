import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { FAQS } from "@/content/faq";
import { Reveal } from "./Reveal";

/** Single centered accordion list — matches the reference site's FAQ styling (see PR notes). */
const FAQ = () => (
  <section id="faq" className="bg-background py-24 md:py-40">
    <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
      <Reveal>
        <h2 className="display text-[9vw] uppercase leading-[0.92] sm:text-[6vw] lg:text-[3.2vw]">FAQ's</h2>
      </Reveal>

      <Reveal delay={0.08}>
        <AccordionPrimitive.Root type="single" collapsible className="mt-14 border-t border-border text-left">
          {FAQS.map((f, i) => (
            <AccordionPrimitive.Item key={f.question} value={`item-${i}`} className="border-b border-border">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left font-sans text-lg font-medium transition-colors duration-300 ease-lux hover:text-primary md:text-xl">
                  {f.question}
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-lux group-hover:text-primary group-data-[state=open]:rotate-45" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-6 pr-10 text-sm leading-loose text-muted-foreground">{f.answer}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </Reveal>
    </div>
  </section>
);

export default FAQ;
