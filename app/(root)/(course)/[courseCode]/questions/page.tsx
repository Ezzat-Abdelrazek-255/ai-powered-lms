import CourseQuestions from "@/components/pages/course/questions/course-questions";
import CourseQuestionsHeader from "@/components/pages/course/questions/course-questions-header";
import CourseSection from "@/components/pages/course/ui/course-section";
import React from "react";

const QuestionsPage = () => {
  return (
    <CourseSection>
      <CourseQuestionsHeader />
      <CourseQuestions />
    </CourseSection>
  );
};

export default QuestionsPage;
