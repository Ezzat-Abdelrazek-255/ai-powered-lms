"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusSvg } from "@/components/ui/icons";
import Label from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/ui/primary-button";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "@/libs/supabase/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { cn } from "@/utils";

const MAX_OPTIONS_NUM = 4;

type Inputs = {
  question: string;
  rightAnswer: string;
};

const CreateQuestion = ({ courseId }: { courseId: string }) => {
  const supabase = createClient();
  const { register, setValue, handleSubmit, reset } = useForm<Inputs>();
  const [options, setOptions] = useState<{ id: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (options.length < 2) {
      toast.error("Please add at least two options.");
      return;
    }

    setIsLoading(true);

    try {
      const { question, rightAnswer } = data;

      const { data: questionData, error: questionError } = await supabase
        .from("question")
        .insert({
          question,
          right_answer: rightAnswer,
          course_id: courseId,
        })
        .select("*")
        .single();

      if (questionError || !questionData) {
        console.error("Question insert error:", questionError?.message);
        toast.error("Failed to create question. Please try again.");
        return;
      }

      const questionId = questionData.id ?? questionData.question_id;

      const { error: choiceError } = await supabase.from("choice").insert(
        options.map((option) => ({
          question_id: questionId,
          choice: option.text,
        })),
      );

      if (choiceError) {
        console.error("Choice insert error:", choiceError.message);
        toast.error("Failed to add choices. Please try again.");
        return;
      }

      toast.success("Question created successfully!");
      reset();
      setOptions([]);
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  const addOption = function() {
    if (options.length === MAX_OPTIONS_NUM) {
      toast.error("Max number of options is 4");
      return;
    }
    setOptions((options) => [
      ...options,
      {
        id: crypto.randomUUID(),
        text: "",
      },
    ]);
  };

  const removeOption = function(optionId: string) {
    setOptions((options) => options.filter((option) => option.id !== optionId));
  };
  const handleOptionChange = function(
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: string,
  ) {
    setOptions((options) =>
      options.map((option) =>
        option.id === optionId ? { ...option, text: e.target.value } : option,
      ),
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger
        aria-label="Add Module"
        className="group rounded-[1.6rem] border border-dashed border-white/50 bg-gray-light/50 text-[2.4rem] font-bold uppercase transition-colors hover:bg-gray-light/80"
      >
        <div className="flex items-center justify-center gap-[1.6rem]">
          <div className="rounded-full border border-white/50 bg-gray-dark p-[1.6rem] transition-colors group-hover:bg-black">
            <PlusSvg className="w-[2.4rem] text-white" />
          </div>
          <span>Add Question</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[54rem] max-w-none bg-beige p-[4.8rem]">
        <DialogTitle className="sr-only">Create a question</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h4 mb-[3.2rem] text-center uppercase text-black">
            Create a question
          </h2>
          <div className="mb-[2.4rem] space-y-[1.6rem]">
            <div className="space-y-[0.4rem]">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                type="string"
                placeholder="e.g. What is the primary gas found in the Earth's atmosphere"
                required
                variant="outline"
                inputSize="sm"
                {...register("question")}
              />
            </div>
            <div
              className={cn(
                "space-y-[0.4rem]",
                options.length > 0 && "space-y-[1.6rem]",
              )}
            >
              <div className="space-y-[0.4rem]">
                <Label htmlFor="option">Options</Label>
                <div className="space-y-[1.2rem]">
                  {options.map((option) => (
                    <div className="relative" key={option.id}>
                      <Input
                        id={option.id}
                        type="string"
                        value={option.text}
                        onChange={(e) => handleOptionChange(e, option.id)}
                        placeholder="e.g. Oxygen"
                        required
                        variant="outline"
                        inputSize="sm"
                      />
                      <button
                        className="absolute right-[0.8rem] top-1/2 grid h-[2.4rem] w-[2.4rem] -translate-y-1/2 place-content-center rounded-full bg-gray-dark"
                        type="button"
                        aria-label="remove option"
                        onClick={() => removeOption(option.id)}
                      >
                        <X className="w-[1.4rem]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <PrimaryButton
                variant="secondary"
                className="w-full"
                onClick={addOption}
                type="button"
              >
                Add Option
              </PrimaryButton>
            </div>
            {options.filter((option) => option.text).length > 1 && (
              <Select onValueChange={(value) => setValue("rightAnswer", value)}>
                <SelectTrigger className="h-auto w-full rounded-xs border-0 bg-gray-light px-[1.6rem] py-[1.2rem] font-mono uppercase leading-none">
                  <SelectValue placeholder="Right Option" />
                </SelectTrigger>
                <SelectContent
                  sideOffset={4}
                  className="w-full rounded-xs bg-gray-dark p-[0.8rem] text-white"
                >
                  {options
                    .filter((option) => option.text)
                    .map((option) => (
                      <SelectItem
                        className="w-full cursor-pointer rounded-xs py-[0.8rem] transition-colors hover:bg-gray-light"
                        key={option.id}
                        value={option.text || ""}
                      >
                        {option.text}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <PrimaryButton
            className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
            isLoading={isLoading}
            loadingText="Creating Question"
            type="submit"
          >
            Submit Question
          </PrimaryButton>
        </form>
        <DialogDescription className="sr-only">
          A form that enables instructors to create a question that could be
          used in a quiz
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestion;
