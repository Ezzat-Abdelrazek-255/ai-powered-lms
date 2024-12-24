import { cn } from "@/lib/utils";
import React from "react";

type CourseSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const CourseSection = ({ children, className }: CourseSectionProps) => {
  return (
    <section
      className={cn(
        "mx-auto max-w-[var(--container-max-width)] py-8",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default CourseSection;
