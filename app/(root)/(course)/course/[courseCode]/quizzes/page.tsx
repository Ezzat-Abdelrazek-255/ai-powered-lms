import CourseQuizzes from "@/components/pages/course/quizzes/quizzes";
import React from "react";

const QuizzesPage = ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
  return (
    <div>
      <CourseQuizzes courseId={courseCode} />
    </div>
  );
};

export default QuizzesPage;
