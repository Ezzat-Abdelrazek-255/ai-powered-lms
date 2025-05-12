import Logo from "@/components/ui/logo";
import Link from "next/link";
import React from "react";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between px-[var(--container-padding)] py-[2.4rem]">
      <Logo />
      <Link className="text-[2.4rem] font-semibold" href="#">
        contact
      </Link>
    </header>
  );
};

export default LandingHeader;
