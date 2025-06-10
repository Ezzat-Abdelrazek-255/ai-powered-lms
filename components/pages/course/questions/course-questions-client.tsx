"use client";

import SearchFilterSort from "../ui/search-filter-sort";
import QuestionCard from "./question-card";
import { Question } from "@/types/question";

const CourseQuestionsClient = ({ questions }: { questions: Question[] }) => {
  return (
    <SearchFilterSort
      items={questions}
      searchKeys={["question"]}
      renderItem={(question) => <QuestionCard question={question} />}
    />
  );
};

export default CourseQuestionsClient;
