import CreateQuestion from "@/components/pages/course/questions/create-question";
import QuestionCard from "@/components/pages/course/questions/question-card";
import CourseSection from "@/components/pages/course/ui/course-section";
import CourseSectionTitle from "@/components/pages/course/ui/course-section-title";
import { createClient } from "@/libs/supabase/server";
import { getQuestions } from "@/services/course";
import React from "react";

const QuestionsPage = async ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
  const supabase = await createClient();
  const questions = await getQuestions(supabase, courseCode);
  console.log(questions);
  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Questions</CourseSectionTitle>
          <p className="text-white/80">
            You have 3 Quizzes in the upcoming 3 days
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-[var(--container-max-width)] grid-cols-3 gap-[1.6rem]">
        <CreateQuestion courseId={courseCode} />
        {questions.map((question) => (
          <QuestionCard question={question} key={question.questionId} />
        ))}
      </div>
    </CourseSection>
  );
};

export default QuestionsPage;
