import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CourseAccordionProps = {
  value: string;
  trigger: string;
  children?: React.ReactNode;
};

const CourseAccordion = ({
  value,
  trigger,
  children,
}: CourseAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-[0.5rem] border-[1px] border-foreground p-6"
    >
      <AccordionItem value={value} className="border-none">
        <AccordionTrigger className="p-0 text-3xl font-bold leading-[85%]">
          {trigger}
        </AccordionTrigger>
        <AccordionContent className="py-4">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseAccordion;
