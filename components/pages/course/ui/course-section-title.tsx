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
  return <h2 className={cn("h2", className)}>{children}</h2>;
};

export default CourseSectionTitle;
