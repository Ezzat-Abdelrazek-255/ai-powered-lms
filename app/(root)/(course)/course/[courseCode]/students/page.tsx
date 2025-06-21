import CourseStudents from "@/components/pages/course/students/course-students";
import { createClient } from "@/libs/supabase/server";
import { getCourseStudents } from "@/services/course";
import React from "react";

const StudentsPage = async ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
  const supabase = await createClient();
  const users = await getCourseStudents(supabase, courseCode);
  return (
    <div>
      <CourseStudents users={users} />
    </div>
  );
};

export default StudentsPage;
