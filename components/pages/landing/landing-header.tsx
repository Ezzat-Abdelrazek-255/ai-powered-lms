import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import React from "react";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 flex w-full items-center justify-between px-[var(--container-padding)] py-6">
      <Logo />
      <Button variant="outline" asChild>
        <Link href="#">Contact</Link>
      </Button>
    </header>
  );
};

export default LandingHeader;
