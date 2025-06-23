import { Question } from "@/types/courses";
import { cn } from "@/utils";
import React from "react";

const QuestionCard = ({ question }: { question: Question }) => {
  return (
    <article className="rounded-[0.8rem] bg-beige p-[3.2rem] py-[6.4rem]">
      <h3 className="mb-[1.6rem] text-center text-[1.6rem] font-bold uppercase text-black">
        {question.question}
      </h3>
      <ul className="grid grid-cols-2 gap-[1.6rem] text-black">
        {question.choice.map((op) => (
          <li
            key={op.choiceId}
            className={cn(
              "rounded-full border border-black px-[1.6rem] py-[1rem] leading-none",
              op.choice === question.rightAnswer && "bg-black text-white",
            )}
          >
            {op.choice}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default QuestionCard;
