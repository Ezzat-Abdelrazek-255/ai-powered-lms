"use client";
import React, { useState } from "react";
// import Image from "next/image";
import PrimaryButton from "@/components/ui/primary-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DialogInput from "@/components/ui/dialog-input";
import plusSvg from "@/public/vectors/plus.svg";
// import optionSvg from "@/public/vectors/option.svg";

const CreateQuestionButton = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([""]);

  const maxOptions = 4;

  const isSubmitDisabled =
    question.trim() === "" ||
    options.length === 0 ||
    options.some((opt) => opt.trim() === "");

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    if (options.length < maxOptions) setOptions([...options, ""]);
  };

  const handleDeleteOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrimaryButton>Create A Question</PrimaryButton>
      </DialogTrigger>
      <DialogContent className="h-auto w-[54rem] max-w-none bg-beige">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h1 className="mt-5 text-4xl font-bold text-black">
              Create A Question
            </h1>
          </DialogTitle>
        </DialogHeader>
        <DialogInput
          name="Question*"
          placeholder="e.g. What is the capital of Egypt"
          id="question"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
          value={question}
        />

        <div className="grid gap-y-8 py-4">
          <div className="grid items-center gap-y-1">
            <Label
              htmlFor="username"
              className="text-xl font-semibold text-gray-light"
            >
              Options*
            </Label>

            <div className="grid rounded-md border border-gray-400">
              {options.map((option, index) => (
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
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    variant="beige"
                    className="col-span-full mb-2 flex-grow border-0 text-xl"
                  ></Input>
                  <button
                    type="button"
                    onClick={() => handleDeleteOption(index)}
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
          onClick={handleAddOption}
          className="col-span-full"
          disabled={options.length == maxOptions}
        >
          {/* <plusSvg /> */}
          Add Option
        </Button>
        <DialogFooter className="grid grid-cols-1">
          <Button variant="secondary" type="submit" disabled={isSubmitDisabled}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionButton;
