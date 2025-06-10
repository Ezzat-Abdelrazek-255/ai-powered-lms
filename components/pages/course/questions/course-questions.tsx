import React from "react";
import QuestionCard from "./question-card";
import { questions } from "@/constants/questions";
import CreateQuestionButton from "./create-question-button";
// import SearchFilterSort from "../search-filter-sort";

const CourseQuestions = () => {
  return (
    <div>
      <CreateQuestionButton />
      <ul className="mx-auto grid max-w-[var(--container-max-width)] grid-cols-3 items-stretch gap-[1.6rem]">
        {questions.map((q, i) => (
          <li key={i}>
            <QuestionCard question={q} />
          </li>
        ))}
      </ul>

      {/* <div className="mx-auto max-w-[var(--container-max-width)]">
        <SearchFilterSort
          items={questions}
          searchKeys={["question"]}
          renderItem={(question) => <QuestionCard question={question} />}
        />
      </div> */}
    </div>
  );
};

export default CourseQuestions;

// import dynamic from "next/dynamic";
// import CourseSection from "../ui/course-section";
// import CourseSectionTitle from "../ui/course-section-title";
// import { questions } from "@/constants/questions";

// const CourseQuestionsClient = dynamic(
//   () => import("./course-questions-client"),
//   { ssr: false },
// );

// const CourseQuestions = () => {
//   return (
//     <CourseSection>
//       <div className="mb-[8rem] border-b-[1px] border-b-white/20">
//         <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
//           <CourseSectionTitle>Questions</CourseSectionTitle>
//           <p className="text-white/80">{questions.length} questions found</p>
//         </div>
//       </div>

//       <CourseQuestionsClient questions={questions} />
//     </CourseSection>
//   );
// };

// export default CourseQuestions;
