import Header from "@/components/ui/header";
import { NavItem } from "@/types/navigation";
import React from "react";

type CourseHeaderProps = {
  courseCode: string;
};

const CourseHeader = ({ courseCode }: CourseHeaderProps) => {
  const rootHrefSrc = `/course/${courseCode}`;
  const courseNavItems: NavItem[] = [
    {
      label: "Home",
      href: rootHrefSrc,
    },
    {
      label: "Students",
      href: `${rootHrefSrc}/students`,
    },

    {
      label: "Submissions",
      href: `${rootHrefSrc}/submissions`,
    },
    {
      label: "Quizzes",
      href: `${rootHrefSrc}/quizzes`,
    },
    {
      label: "Questions",
      href: `${rootHrefSrc}/questions`,
    },
  ];

  return (
    <>
      <Header navItems={courseNavItems} />
    </>
  );
};

export default CourseHeader;
