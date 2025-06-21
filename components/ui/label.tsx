import { cn } from "@/utils";
import React from "react";

const Label = ({
  children,
  required = true,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-[1.4rem] font-semibold text-black/60", className)}
    >
      {children}
      {required && "*"}
    </label>
  );
};

export default Label;
