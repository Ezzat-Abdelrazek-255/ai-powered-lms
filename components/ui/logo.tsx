import React from "react";
import LogoSvg from "../../public/vectors/logo-white.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/dashboard">
      <LogoSvg className="w-[4rem]" />
    </Link>
  );
};

export default Logo;
