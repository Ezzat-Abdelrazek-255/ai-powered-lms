import CourseHome from "@/components/pages/course/home/course-home";
import CourseSidebar from "@/components/pages/course/home/course-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const CoursePage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <SidebarProvider>
          <CourseSidebar />
        </SidebarProvider>
      </div>
      <div className="col-span-10">
        <CourseHome />
      </div>
    </div>
  );
};

export default CoursePage;
