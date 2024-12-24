import Header from "@/components/ui/header";
import { NavItem } from "@/types/navigation";
import React from "react";

type CourseHeaderProps = {
  courseCode: string;
};

const CourseHeader = ({ courseCode }: CourseHeaderProps) => {
  const rootHrefSrc = `/${courseCode}`;
  const courseNavItems: NavItem[] = [
    {
      label: "Home",
      href: rootHrefSrc,
    },
    {
      label: "Participants",
      href: `${rootHrefSrc}/participants`,
    },
    {
      label: "Grades",
      href: `${rootHrefSrc}/grades`,
    },
    {
      label: "Assignments",
      href: `${rootHrefSrc}/assignments`,
    },
    {
      label: "Quizzes",
      href: `${rootHrefSrc}/quizzes`,
    },
  ];

  return (
    <>
      <Header navItems={courseNavItems} />
    </>
  );
};

export default CourseHeader;
