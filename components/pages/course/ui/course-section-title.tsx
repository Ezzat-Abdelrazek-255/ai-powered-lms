import { cn } from "@/lib/utils";
import React from "react";

type CourseSectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const CourseSectionTitle = ({
  children,
  className,
}: CourseSectionTitleProps) => {
  return (
    <h2
      className={cn("text-center text-3xl font-bold leading-[85%]", className)}
    >
      {children}
    </h2>
  );
};

export default CourseSectionTitle;
