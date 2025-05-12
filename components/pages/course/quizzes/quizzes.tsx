import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import SubmissionCard from "../ui/submission-card";
import CourseSection from "../ui/course-section";

const CourseQuizzes = () => {
  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Quizzes</CourseSectionTitle>
          <p className="text-white/80">
            You have 3 Quizzes in the upcoming 3 days
          </p>
        </div>
      </div>
      <ul className="mx-auto flex w-full max-w-[var(--container-max-width)] flex-col gap-4">
        {[...new Array(8)].map((_, i) => (
          <li key={i}>
            <SubmissionCard variant="quiz" />
          </li>
        ))}
      </ul>
    </CourseSection>
  );
};

export default CourseQuizzes;
