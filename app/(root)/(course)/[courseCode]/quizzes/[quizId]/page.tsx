import QuizQuestion from "@/components/pages/course/quizzes/quiz-question";
import QuizSidebar from "@/components/pages/course/quizzes/quiz-sidebar";
import React from "react";
import { Button } from "@/components/ui/button";

const QuizPage = () => {
  return (
    <main className="relative mx-auto grid max-w-[var(--container-max-width)] grid-cols-[1fr_auto] items-start gap-6 px-[var(--container-padding)] py-12">
      <ul className="flex flex-col gap-4">
        {[...new Array(10)].map((_, i) => (
          <li key={i} id={`question-${i + 1}`}>
            <QuizQuestion />
          </li>
        ))}
      </ul>
      <QuizSidebar />
      <Button className="justify-self-center">Finish Attempt</Button>
    </main>
  );
};

export default QuizPage;
