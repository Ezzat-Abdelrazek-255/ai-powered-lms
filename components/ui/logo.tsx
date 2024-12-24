import React from "react";
import LogoSvg from "../../public/vectors/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <LogoSvg />
    </Link>
  );
};

export default Logo;
