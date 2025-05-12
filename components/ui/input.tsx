import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva("rounded-xs", {
  variants: {
    variant: {
      default: "w-full text-white bg-gray-dark placeholder:text-white/60",
    },
    inputSize: {
      default: "text-[1.8rem] h-[4rem]  px-[1.2rem] ",
      sm: "",
    },
  },
  defaultVariants: {
    variant: "default",
    inputSize: "default",
  },
});

export interface InputProps
  extends React.ComponentProps<"input">,
  VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant,
            inputSize,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
