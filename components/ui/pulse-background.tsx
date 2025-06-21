"use client";

import React, { useRef } from "react";
import { BackgroundSvg, BackgroundPulseSvg } from "./icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PulseBackground = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Create a timeline that repeats indefinitely with a 2 second delay between repetitions.
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 4,
        defaults: {
          ease: "power2.inOut",
          duration: 2,
        },
      });

      // Animate the elements.
      tl.to(".p1", {
        strokeDashoffset: "-934px",
      })
        .to(
          ".p2",
          {
            strokeDashoffset: "-2008px",
          },
          0,
        ) // starting at the same time as p1 animation
        .to(
          ".p3",
          {
            strokeDashoffset: "934px",
          },
          0,
        ); // starting at the same time as p1 animation

      // You can add further customizations or delays within your timeline if needed.
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-hidden min-h-screen w-full"
    >
      <BackgroundPulseSvg className="pulse-stroke relative z-base h-full w-full stroke-primary stroke-[1px]" />
      <BackgroundSvg className="absolute inset-0 h-full w-full stroke-gray-dark stroke-[1px]" />
    </div>
  );
};

export default PulseBackground;
