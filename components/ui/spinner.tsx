import React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/utils";

const Spinner = ({ className }: { className?: string }) => {
  return <LoaderCircle className={cn("animate-spin", className)} />;
};

export default Spinner;
