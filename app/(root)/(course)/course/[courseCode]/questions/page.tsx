import CreateQuestion from "@/components/pages/course/questions/create-question";
import QuestionCard from "@/components/pages/course/questions/question-card";
import CourseSection from "@/components/pages/course/ui/course-section";
import CourseSectionTitle from "@/components/pages/course/ui/course-section-title";
import { PlusSvg } from "@/components/ui/icons";
import React from "react";

const QuestionsPage = ({
  params: { courseCode },
}: {
  params: { courseCode: string };
}) => {
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
      <CreateQuestion courseId={courseCode} />
      <div className="mx-auto grid max-w-[var(--container-max-width)] grid-cols-3 gap-[1.6rem]">
        <button className="group rounded-[1.6rem] border border-dashed border-white/50 bg-gray-light/50 text-[2.4rem] font-bold uppercase transition-colors hover:bg-gray-light/80">
          <div className="flex flex-col items-center gap-[1.6rem]">
            <div className="rounded-full border border-white/50 bg-gray-dark p-[1.6rem] transition-colors group-hover:bg-black">
              <PlusSvg className="w-[2.4rem] text-white" />
            </div>
            <span>Create Question</span>
          </div>
        </button>
        {[...new Array(8)].map((_, i) => (
          <QuestionCard key={i} />
        ))}
      </div>
    </CourseSection>
  );
};

export default QuestionsPage;
