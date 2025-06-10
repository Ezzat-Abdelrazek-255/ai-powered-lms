import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import { questions } from "@/constants/questions";

const CourseQuestionsHeader = () => {
  return (
    <div className="mb-[8rem] border-b-[1px] border-b-white/20">
      <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
        <CourseSectionTitle>Questions</CourseSectionTitle>
        <p className="text-white/80">{questions.length} questions found</p>
      </div>
    </div>
  );
};

export default CourseQuestionsHeader;
