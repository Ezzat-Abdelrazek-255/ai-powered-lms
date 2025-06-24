import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import SubmissionCard from "../ui/submission-card";
import CourseSection from "../ui/course-section";
import { getQuizzes } from "@/services/course";
import { createClient } from "@/libs/supabase/server";

const CourseQuizzes = async ({ courseId }: { courseId: string }) => {
  const supabase = await createClient();
  const quizzes = await getQuizzes(supabase, courseId);

  // Calculate how many quizzes become available in the next 7 days
  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingQuizzes = quizzes
    ? quizzes?.filter((quiz) => {
      const available = new Date(quiz.availableDate);
      return available >= now && available <= sevenDaysLater;
    })
    : [];

  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Quizzes</CourseSectionTitle>
          <p className="text-white/80">
            You have {upcomingQuizzes.length} quiz
            {upcomingQuizzes.length !== 1 ? "zes" : ""} in the upcoming 7 days
          </p>
        </div>
      </div>
      <ul className="mx-auto flex w-full max-w-[var(--container-max-width)] flex-col gap-4">
        {quizzes?.map((quiz) => (
          <li key={quiz.quizId}>
            <SubmissionCard courseId={courseId} quiz={quiz} variant="quiz" />
          </li>
        ))}
      </ul>
    </CourseSection>
  );
};

export default CourseQuizzes;
