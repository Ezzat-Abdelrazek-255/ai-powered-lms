"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { NavItem } from "@/types/navigation";

type NavigationProps = {
  navItems: NavItem[];
};

const Navigation = ({ navItems }: NavigationProps) => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-[2.4rem] leading-[85%]">
        {navItems.map((item) => (
          <li
            key={item.label}
            className={cn(
              "relative pb-[1.2rem]",
              pathname === item.href && "text-primary",
            )}
          >
            {pathname === item.href && (
              <motion.div
                layoutId="item"
                className="absolute bottom-0 h-[2px] w-full bg-primary"
              ></motion.div>
            )}
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
