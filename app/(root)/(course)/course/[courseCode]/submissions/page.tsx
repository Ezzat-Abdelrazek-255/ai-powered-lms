import CourseAssignments from "@/components/pages/course/assignments/course-assignments";
import React from "react";

const AssignmentsPage = ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
  return (
    <div>
      <CourseAssignments courseId={courseCode} />
    </div>
  );
};

export default AssignmentsPage;
