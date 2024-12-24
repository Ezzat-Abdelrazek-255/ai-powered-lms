import { cn } from "@/lib/utils";
import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return (
    <h2 className={cn("text-2xl font-bold leading-[85%]", className)}>
      {children}
    </h2>
  );
};

export default SectionTitle;
