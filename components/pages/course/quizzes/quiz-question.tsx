import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ArrowSvg from "../../../../public/vectors/arrow.svg";
import { cn } from "@/utils";
import { Swiper } from "swiper/types";
import { Choice } from "@/types/courses";

const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

interface QuizQuestionProps {
  index: number;
  totalQuestions: number;
  swiperInstance: Swiper;
  question: {
    question: {
      question: string;
      choice: Choice[];
      questionId: string;
    };
    questionOrder: number;
  };
  selectedAnswer: string | null;
  onAnswerChange: (questionId: string, choiceId: string) => void;
  onSubmit: () => Promise<void>;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  index,
  totalQuestions,
  swiperInstance,
  question,
  selectedAnswer,
  onAnswerChange,
  onSubmit,
  isLastQuestion,
}) => {
  const handleAnswerChange = (choiceId: string) => {
    onAnswerChange(question.question.questionId, choiceId);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      await onSubmit();
    } else {
      swiperInstance.slideNext();
    }
  };

  const handlePrev = () => {
    swiperInstance.slidePrev();
  };

  return (
    <motion.article
      layoutId={`quiz-question-${index}`}
      className="relative grid h-[48rem] w-[76rem] place-content-center rounded-sm border-[1px] border-black bg-beige text-black"
    >
      <div className="max-w-[49rem]">
        <h3 className="h3 mb-[2.4rem] text-center uppercase leading-[120%]">
          {question.question.question}
        </h3>
        <RadioGroup
          className="mb-[4.8rem] grid grid-cols-2 gap-x-[0.8rem]"
          value={selectedAnswer || ""}
          onValueChange={handleAnswerChange}
        >
          {question.question.choice.map((choice, i) => (
            <div key={choice.choiceId} className="flex items-center">
              <RadioGroupItem
                className="peer hidden"
                value={choice.choiceId}
                id={choice.choiceId}
              />
              <label
                htmlFor={choice.choiceId}
                className="flex w-full cursor-pointer gap-[1rem] rounded-full border-[1px] border-black px-[2.4rem] py-[1.2rem] text-[1.4rem] leading-[85%] transition-colors hover:bg-blue/40 hover:text-white peer-[[data-state=checked]]:bg-blue peer-[[data-state=checked]]:text-white"
              >
                <span className="uppercase">{ALPHABET[i]}:</span>
                <span>{choice.choice}</span>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-[0.8rem]",
          index === 0 && "grid-cols-1",
        )}
      >
        {index !== 0 && (
          <Button
            variant="secondary"
            className="justify-self-end rounded-full px-[1.6rem] py-[1rem] transition-colors hover:bg-black/90"
            onClick={handlePrev}
          >
            <ArrowSvg className="h-[0.8rem] w-[0.8rem] -rotate-[135deg] fill-white" />
            <span>Prev</span>
          </Button>
        )}
        <Button
          variant={isLastQuestion ? "default" : "secondary"}
          className={cn(
            "justify-self-start rounded-full px-[1.6rem] py-[1rem] transition-colors",
            index === 0 && "justify-self-center",
            !isLastQuestion && "hover:bg-black/90",
          )}
          onClick={handleNext}
        >
          <span>{isLastQuestion ? "Submit" : "Next"}</span>
          <ArrowSvg
            className={cn(
              "h-[0.8rem] w-[0.8rem] rotate-45 fill-white",
              isLastQuestion && "fill-black",
            )}
          />
        </Button>
      </div>

      <p className="absolute bottom-[2.4rem] left-[2.4rem] font-mono">
        {index}/{totalQuestions}
      </p>
    </motion.article>
  );
};

export default QuizQuestion;
