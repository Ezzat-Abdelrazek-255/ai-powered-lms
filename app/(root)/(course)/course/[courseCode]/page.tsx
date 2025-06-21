import CourseHome from "@/components/pages/course/home/course-home";
import CourseSidebar from "@/components/pages/course/home/course-sidebar";
import { createClient } from "@/libs/supabase/server";
import { getCourse } from "@/services/course";
import React from "react";

const CoursePage = async ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
  const supabase = await createClient();
  const course = await getCourse(supabase, courseCode);

  return (
    <div className="grid min-h-[calc(100vh-var(--header-height))] grid-cols-[38rem_1fr]">
      <CourseSidebar course={course} />
      <CourseHome course={course} />
    </div>
  );
};

export default CoursePage;
