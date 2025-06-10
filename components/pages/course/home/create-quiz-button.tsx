"use client";
import React, { useState } from "react";

import PrimaryButton from "@/components/ui/primary-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DialogInput from "@/components/ui/dialog-input";
import { Calendar24 } from "@/components/ui/calendar24";
// import { plusSvg } from "@/public/vectors/plus2.svg";

const CreateQuizButton = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) => {
  const [questions, setQuestions] = useState<string[]>([""]);

  const maxQuestions = 20;

  const handleQuestionChange = (index: number, value: string) => {};

  const handleAddQuestion = () => {};

  const handleDeleteQuestion = (index: number) => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <PrimaryButton>Create A Quiz</PrimaryButton>
      </DialogTrigger> */}
      <DialogContent className="bg-beige sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h1 className="mt-5 text-4xl font-bold text-black">Create Quiz</h1>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-4">
          <DialogInput
            name="Quiz title*"
            placeholder="e.g. Quiz 1"
            id="title"
          />
          <DialogInput
            name="Attempts allowed*"
            placeholder="e.g. 1"
            id="attempts"
          />

          <DialogInput
            name="Quiz syllabus"
            placeholder="e.g. Chapters 1-5: Algebra, Geometry, Trigonometry"
            id="syllabus"
            className="col-span-2"
          />
          <div className="sm:col-span-2">
            <Label className="text-xl font-semibold text-gray-light">
              Available on*
            </Label>
            <Calendar24 text="Select Start Date" />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xl font-semibold text-gray-light">
              Close on*
            </Label>
            <Calendar24 text="Select End Date" />
          </div>

          <DialogInput
            name="Time limit (in minutes)*"
            placeholder="e.g. 10"
            id="time"
          />
          <DialogInput name="Max grade" placeholder="e.g. 20" id="grade" />

          <div className="col-span-2 grid items-center gap-y-1">
            <Label
              htmlFor="username"
              className="text-xl font-semibold text-gray-light"
            >
              Questions*
            </Label>

            <div className="grid rounded-md border border-gray-400">
              {questions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-md px-2 py-1"
                >
                  {/* <Image
                    src={optionSvg}
                    alt="option icon"
                    width={20}
                    height={20}
                  /> */}

                  <Input
                    value={option}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    placeholder={`Option ${index + 1}`}
                    variant="beige"
                    className="col-span-full mb-2 flex-grow border-0 text-xl"
                  ></Input>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(index)}
                    className="hover:text-red-700 px-3 text-2xl text-red"
                    title="Delete option"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={handleAddQuestion}
          className="col-span-full"
          disabled={questions.length == maxQuestions}
        >
          {/* <plusSvg className="h-[1.4rem] w-[1.4rem] fill-black" /> */}
          Add Question
        </Button>
        <DialogFooter className="grid grid-cols-1">
          {/* <DialogClose asChild>
            <Button variant="secondary" type="button">
              Close
            </Button>
          </DialogClose> */}
          <Button
            variant="secondary"
            type="submit"
            onClick={() => onOpenChange(false)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateQuizButton;
