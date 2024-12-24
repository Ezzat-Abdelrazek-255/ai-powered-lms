import HomeHeader from "@/components/pages/home/ui/home-header";
import React from "react";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <HomeHeader />
      <main className="mx-auto w-full max-w-[var(--main-container-max-width)]">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;
