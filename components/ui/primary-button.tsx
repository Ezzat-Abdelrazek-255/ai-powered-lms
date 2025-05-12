"use client";
import React, { useRef } from "react";
import { Button, ButtonProps } from "./button";
import EnterSvg from "../../public/vectors/enter.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const timelineDefaults = { duration: 0.4, ease: "power2.out" };

const PrimaryButton = ({ children, className, ...props }: ButtonProps) => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP(() => { }, {
    scope: containerRef,
  });

  const handleMouseEnter = contextSafe(() => {
    gsap
      .timeline({ defaults: timelineDefaults })
      .to(".primary-btn .initial", { y: "-250%" })
      .to(".primary-btn .overflow", { y: "-50%" }, 0);
  });

  const handleMouseLeave = contextSafe(() => {
    gsap
      .timeline({ defaults: timelineDefaults })
      .to(".primary-btn .initial", { y: "0%" })
      .to(".primary-btn .overflow", { y: "200%" }, 0);
  });

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("primary-btn", className)}
      ref={containerRef}
      {...props}
    >
      <div className="initial flex items-center justify-center gap-[0.8rem]">
        <EnterSvg className="h-[1.2rem] w-[1rem] fill-current" />
        {children}
      </div>
      <div className="overflow absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 translate-y-[200%] items-center justify-center gap-[0.8rem]">
        <EnterSvg className="h-[1.2rem] w-[1rem] fill-current" />
        {children}
      </div>
    </Button>
  );
};

export default PrimaryButton;
