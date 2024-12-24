import Header from "@/components/ui/header";
import { homeNavItems } from "@/constants/home";
import React from "react";

const HomeHeader = () => {
  return (
    <>
      <Header navItems={homeNavItems} />
    </>
  );
};

export default HomeHeader;
