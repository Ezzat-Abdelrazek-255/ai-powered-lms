import HomeHeader from "@/components/pages/home/ui/home-header";
import React from "react";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] pb-[var(--container-py)]">
      <HomeHeader />
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
