import * as React from "react";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "rounded-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "w-full text-white bg-gray-dark placeholder:text-white/60 ",
        outline:
          "w-full text-black bg-transparent placeholder:text-black/60 border border-black/60",
      },
      inputSize: {
        default: "text-[1.8rem] h-[4rem]  px-[1.2rem] ",
        sm: "text-[1.2rem] p-[1rem] px-[1.2rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

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
