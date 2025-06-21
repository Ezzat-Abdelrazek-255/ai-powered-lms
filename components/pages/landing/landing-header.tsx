import Logo from "@/components/ui/logo";
import React from "react";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between px-[var(--container-padding)] py-[2.4rem]">
      <Logo />
      <p>Contact</p>
    </header>
  );
};

export default LandingHeader;
