import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ArrowSvg from "../../../../public/vectors/arrow.svg";
import { cn } from "@/utils";
import { Swiper } from "swiper/types";

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

const QUESTIONS = [
  {
    value: "oxygen",
    label: "Oxygen",
  },
  {
    value: "hydrogen",
    label: "Hydrogen",
  },
  {
    value: "nitrogen",
    label: "Nitrogen",
  },
  {
    value: "helium",
    label: "Helium",
  },
];

const QuizQuestion = ({
  index,
  swiperInstance,
}: {
  index: number;
  swiperInstance: Swiper;
}) => {
  return (
    <motion.article
      layoutId={`quiz-question-${index}`}
      className="relative grid h-[48rem] w-[76rem] place-content-center rounded-sm border-[1px] border-black bg-beige text-black"
    >
      <div className="max-w-[49rem]">
        <h3 className="h3 mb-[2.4rem] text-center uppercase leading-[120%]">
          What is the primary gas found in the Earth&apos;s atmosphere
        </h3>
        <RadioGroup className="mb-[4.8rem] grid grid-cols-2 gap-x-[0.8rem]">
          {QUESTIONS.map((question, i) => (
            <div key={question.value} className="flex items-center">
              <RadioGroupItem
                className="peer hidden"
                value={question.value}
                id={question.value}
              />
              <label
                htmlFor={question.value}
                className="flex w-full cursor-pointer gap-[1rem] rounded-full border-[1px] border-black px-[2.4rem] py-[1.2rem] text-[1.4rem] leading-[85%] transition-colors hover:bg-blue/70 hover:text-white peer-[[data-state=checked]]:bg-blue peer-[[data-state=checked]]:text-white"
              >
                <span className="uppercase">{ALPHABET[i]}:</span>
                <span>{question.label}</span>
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
            onClick={() => swiperInstance.slidePrev()}
          >
            <ArrowSvg className="h-[0.8rem] w-[0.8rem] -rotate-[135deg] fill-white" />
            <span>Prev</span>
          </Button>
        )}
        <Button
          variant="secondary"
          className={cn(
            "justify-self-start rounded-full px-[1.6rem] py-[1rem] transition-colors hover:bg-black/90",
            index === 0 && "justify-self-center",
          )}
          onClick={() => swiperInstance.slideNext()}
        >
          <span>Next</span>
          <ArrowSvg className="h-[0.8rem] w-[0.8rem] rotate-45 fill-white" />
        </Button>
      </div>
      <p className="absolute bottom-[2.4rem] left-[2.4rem] font-mono">
        {index + 1}/11
      </p>
    </motion.article>
  );
};

export default QuizQuestion;
