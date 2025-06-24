import Header from "@/components/ui/header";
import { createClient } from "@/libs/supabase/server";
import { NavItem } from "@/types/navigation";
import { getUserMetadata } from "@/utils";
import React from "react";

type CourseHeaderProps = {
  courseCode: string;
};

const CourseHeader = async ({ courseCode }: CourseHeaderProps) => {
  const supabase = await createClient();
  const userMetadata = await getUserMetadata(supabase);
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
  ];

  if (userMetadata.role === "instructor") {
    courseNavItems.push({
      label: "Questions",
      href: `${rootHrefSrc}/questions`,
    });
  }

  return (
    <>
      <Header navItems={courseNavItems} />
    </>
  );
};

export default CourseHeader;
