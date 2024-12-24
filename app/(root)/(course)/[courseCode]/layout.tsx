import { SidebarProvider } from "@/components/ui/sidebar";
import CourseHeader from "@/components/pages/course/ui/course-header";
import React from "react";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: {
    courseCode: string;
  };
};

const CourseLayout = ({ children, params }: CourseLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <CourseHeader courseCode={params.courseCode} />
      <main className="h-[calc(100vh-var(--header-height))]">{children}</main>
    </div>
  );
};

export default CourseLayout;
