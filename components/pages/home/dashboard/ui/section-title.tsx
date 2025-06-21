import React from "react";
import { cn } from "@/utils";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  return <h2 className={cn("h2", className)}>{children}</h2>;
};

export default SectionTitle;
