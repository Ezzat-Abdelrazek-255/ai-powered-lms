import React from "react";
import { Question } from "@/types/question";

const QuestionCard = ({ question }: { question: Question }) => {
  const optionLabels = ["A.", "B.", "C.", "D."];

  return (
    <article className="flex h-full flex-col justify-between rounded-sm bg-beige p-[1.6rem] text-black">
      <div className="mb-[1.6rem] text-center text-[1.6rem] font-bold leading-tight">
        {question.question}
      </div>
      <div className="grid grid-cols-2 gap-[1.2rem] font-mono text-[1.2rem] uppercase">
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-[0.4rem] rounded-lg border border-black p-2 px-6"
          >
            <span className="font-bold">{optionLabels[index]}</span>
            <span>{option}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default QuestionCard;
