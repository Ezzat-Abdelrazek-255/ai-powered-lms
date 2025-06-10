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
      className="rounded-sm bg-beige p-[2.4rem] text-black"
    >
      <AccordionItem value={value} className="border-none">
        <AccordionTrigger className="text-[2.8rem] font-bold leading-[85%]">
          {value}
        </AccordionTrigger>
        <AccordionContent className="py-0">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseAccordion;
