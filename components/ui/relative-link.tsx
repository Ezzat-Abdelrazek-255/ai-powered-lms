"use client";
import React, { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LinkProps } from "next/link";

type RelativeLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement>;

const RelativeLink = (props: RelativeLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = function(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    router.push(`${pathname}${props.href}`);
  };

  return (
    <Link onClick={handleClick} {...props}>
      {props.children}
    </Link>
  );
};

export default RelativeLink;
