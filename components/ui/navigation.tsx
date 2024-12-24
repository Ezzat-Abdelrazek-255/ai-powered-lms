"use client";

import { cn } from "@/lib/utils";
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
      <ul className="flex gap-8 font-bold leading-[85%]">
        {navItems.map((item) => (
          <li
            key={item.label}
            className={cn(
              "relative pb-2",
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
