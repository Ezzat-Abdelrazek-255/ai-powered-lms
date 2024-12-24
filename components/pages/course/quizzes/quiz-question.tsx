import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const QuizQuestion = () => {
  return (
    <article className="flex w-full items-start justify-between gap-6 rounded-[1rem] border-[1px] border-foreground p-6">
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl leading-[85%]">
            Q1. Question Title (Choose the correct answer)
          </h2>
          <p className="font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna.
          </p>
        </div>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="aspect-square h-64 rounded-[0.5rem] bg-foreground"></div>
    </article>
  );
};

export default QuizQuestion;
