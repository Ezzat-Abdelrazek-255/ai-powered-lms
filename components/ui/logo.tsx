import React from "react";
import { LogoWhiteSvg } from "./icons";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <LogoWhiteSvg className="w-[4rem]" />
    </Link>
  );
};

export default Logo;
