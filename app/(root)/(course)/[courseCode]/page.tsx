import CourseHome from "@/components/pages/course/home/course-home";
import CourseSidebar from "@/components/pages/course/home/course-sidebar";
import React from "react";

const CoursePage = () => {
  return (
    <div className="grid min-h-[calc(100vh-var(--header-height))] grid-cols-[38rem_1fr]">
      <CourseSidebar />
      <CourseHome />
    </div>
  );
};

export default CoursePage;
