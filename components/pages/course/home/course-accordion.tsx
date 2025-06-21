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
    <Accordion type="single" collapsible className="rounded-xs">
      <AccordionItem value={value} className="border-none">
        <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] rounded-xs p-[1.6rem] text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
          {trigger}
        </AccordionTrigger>
        <AccordionContent className="px-[1.6rem]">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseAccordion;
