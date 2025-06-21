import React from "react";
import { cn } from "@/utils";

type CourseSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const CourseSection = ({ children, className }: CourseSectionProps) => {
  return (
    <section className={cn("px-[var(--container-px)] pt-[3.2rem]", className)}>
      {children}
    </section>
  );
};

export default CourseSection;
