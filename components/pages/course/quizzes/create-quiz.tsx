"use client";

import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { AbstractSvg } from "@/components/ui/icons";
import { useForm } from "react-hook-form";
import PrimaryButton from "@/components/ui/primary-button";
import { Choice } from "@/types/courses";
import Label from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateInput } from "@/components/ui/date-input";
import { createClient } from "@/libs/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { createQuiz, getQuestions } from "@/services/course"; // Assuming you have a createQuiz function
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ComboBox } from "@/components/ui/combobox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

type Inputs = {
  title: string;
  description?: string;
  availableDate: Date;
  availableTime: string;
  closeDate: Date;
  closeTime: string;
  timeLimit: number;
  maxGrade: number;
};

type Option = {
  label: string;
  value: string;
  choices: Choice[];
  id: string;
};

const CreateQuiz = ({
  courseId,
  moduleId,
  dropdownMenuItem,
}: {
  courseId: string;
  moduleId: string;
  dropdownMenuItem?: React.ReactNode;
}) => {
  const { handleSubmit, register, watch, setValue, reset } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [comboBoxValue, setComboBoxValue] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async function() {
      const questions = await getQuestions(supabase, courseId);
      const options = questions.map((question) => ({
        label: question.question,
        value: question.question,
        choices: question.choice,
        id: question.questionId,
      }));
      setOptions(options);
      setFilteredOptions(options);
    };
    fetchQuestions();
  }, [courseId, supabase]);

  const title = watch("title");
  const availableDate = watch("availableDate");
  const availableTime = watch("availableTime");
  const closeDate = watch("closeDate");
  const closeTime = watch("closeTime");
  const timeLimit = watch("timeLimit");
  const maxGrade = watch("maxGrade");

  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true);

      // Validate that at least one question is selected
      if (questions.length === 0) {
        toast.error("Please select at least one question for the quiz");
        return;
      }

      // Combine available date and time
      const [availHours, availMinutes, availSeconds] = data.availableTime
        .split(":")
        .map(Number);
      const availableDateTime = new Date(data.availableDate);
      availableDateTime.setHours(
        availHours,
        availMinutes,
        availSeconds || 0,
        0,
      );

      // Combine close date and time
      const [closeHours, closeMinutes, closeSecondsInput] = data.closeTime
        .split(":")
        .map(Number);
      const closeDateTime = new Date(data.closeDate);
      closeDateTime.setHours(
        closeHours,
        closeMinutes,
        closeSecondsInput || 0,
        0,
      );

      // Validate that close date is after available date
      if (closeDateTime <= availableDateTime) {
        toast.error("Close date must be after the available date");
        return;
      }

      // Get selected question objects with choices
      const selectedQuestions = questions
        .map((questionText) =>
          options.find((option) => option.label === questionText),
        )
        .filter(Boolean);

      await createQuiz(supabase, {
        course_id: courseId,
        module_id: moduleId,
        title: data.title,
        description: data.description || "",
        available_date: availableDateTime,
        close_date: closeDateTime,
        time_limit: data.timeLimit,
        max_grade: data.maxGrade,
        questions: selectedQuestions,
      });

      toast.success("Quiz Created Successfully!");
      setIsOpen(false);
      reset();
      setQuestions([]);
      setFilteredOptions(options);
      setComboBoxValue("");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  function addQuestion(question: string) {
    if (!question) {
      toast.error("Please select a question");
      return;
    }

    if (questions.includes(question)) {
      toast.error("Question already added");
      return;
    }

    setFilteredOptions((options) =>
      options.filter((op) => op.label !== question),
    );
    setComboBoxValue("");
    setQuestions((questions) => [...questions, question]);
  }

  function removeQuestion(question: string) {
    setQuestions((questions) => questions.filter((ques) => ques !== question));
    const questionToAdd = options.find((op) => op.label === question);
    if (questionToAdd) {
      setFilteredOptions((ops) => [...ops, questionToAdd]);
    }
  }

  const isFormValid =
    title &&
    availableDate &&
    availableTime &&
    closeDate &&
    closeTime &&
    timeLimit &&
    maxGrade &&
    questions.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      {dropdownMenuItem ? (
        <DialogTrigger asChild>{dropdownMenuItem}</DialogTrigger>
      ) : (
        <DialogTrigger className="flex items-center gap-[0.8rem]">
          <AbstractSvg className="h-4 w-4 text-white" />
          Create Quiz
        </DialogTrigger>
      )}
      <DialogContent className="w-[54rem] max-w-none bg-beige">
        <ScrollArea className="h-[50vh]">
          <div className="p-[4.8rem]">
            <DialogTitle className="sr-only">Create Quiz</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-[2.4rem] space-y-[2.4rem]">
                <h2 className="h4 mb-[3.2rem] text-center uppercase text-black">
                  Create Quiz
                </h2>
                <div className="space-y-[0.4rem]">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    type="text"
                    inputSize="sm"
                    variant="outline"
                    placeholder="e.g. Quiz 1"
                    {...register("title", { required: true })}
                    className="w-full"
                  />
                </div>
                <div className="space-y-[0.4rem]">
                  <Label htmlFor="description" required={false}>
                    Quiz description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="e.g. This quiz covers Digital Literacy concepts..."
                    {...register("description")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-[1.6rem]">
                  {/* Available Date and Time */}
                  <DateInput
                    value={availableDate}
                    onChange={(date) => {
                      setValue("availableDate", new Date(date!), {
                        shouldValidate: true,
                      });
                    }}
                    label="Available on"
                    placeholder="Available date"
                  />
                  <div className="space-y-[0.4rem]">
                    <Label htmlFor="availableTime">Available at</Label>
                    <Input
                      id="availableTime"
                      type="time"
                      step="1"
                      {...register("availableTime", { required: true })}
                      className="py-[2rem] text-black/60"
                      variant="outline"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-[1.6rem]">
                  {/* Close Date and Time */}
                  <DateInput
                    value={closeDate}
                    onChange={(date) => {
                      setValue("closeDate", new Date(date!), {
                        shouldValidate: true,
                      });
                    }}
                    label="Close on"
                    placeholder="Close date"
                  />
                  <div className="space-y-[0.4rem]">
                    <Label htmlFor="closeTime">Close at</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      step="1"
                      {...register("closeTime", { required: true })}
                      className="py-[2rem] text-black/60"
                      variant="outline"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-[1.6rem]">
                  <div className="space-y-[0.4rem]">
                    <Label htmlFor="timeLimit">Time limit (in minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      inputSize="sm"
                      variant="outline"
                      placeholder="e.g. 30"
                      {...register("timeLimit", { required: true, min: 1 })}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-[0.4rem]">
                    <Label htmlFor="maxGrade">Max grade</Label>
                    <Input
                      id="maxGrade"
                      type="number"
                      inputSize="sm"
                      variant="outline"
                      placeholder="e.g. 20"
                      {...register("maxGrade", { required: true, min: 1 })}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-[0.4rem]">
                    Questions ({questions.length} selected)
                  </Label>

                  <ScrollArea className="h-[30rem] w-full rounded-xs border border-black/60 p-[1.2rem]">
                    <ul className="space-y-[1.2rem] font-semibold text-black">
                      {questions.map((question, i) => (
                        <li
                          className="grid w-full grid-cols-[1fr_auto] items-center justify-between gap-[1.6rem] px-[0.4rem] py-[0.8rem]"
                          key={question}
                        >
                          <div className="flex items-center space-x-[0.8rem] truncate">
                            <span>{i + 1})</span>
                            <div className="truncate">
                              <span className="truncate whitespace-nowrap">
                                {question}
                              </span>
                            </div>
                          </div>
                          <button
                            className="grid place-content-center rounded-full bg-gray-dark p-[0.4rem]"
                            type="button"
                            aria-label="remove question"
                            onClick={() => removeQuestion(question)}
                          >
                            <X className="size-[1.2rem] text-white" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-[1fr_auto] gap-[1.2rem] py-[0.8rem]">
                      <ComboBox
                        options={filteredOptions}
                        placeholder="Select Question..."
                        value={comboBoxValue}
                        onChange={setComboBoxValue}
                      />
                      <PrimaryButton
                        className="max-h-[4rem]"
                        variant="secondary"
                        onClick={() => addQuestion(comboBoxValue)}
                        type="button"
                      >
                        Create
                      </PrimaryButton>
                    </div>
                    <ScrollBar className="border-b-blue" />
                  </ScrollArea>
                </div>
              </div>
              <PrimaryButton
                type="submit"
                isLoading={isLoading}
                loadingText="Creating Quiz..."
                disabled={!isFormValid || isLoading}
                className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
              >
                Create Quiz
              </PrimaryButton>
            </form>

            <DialogDescription className="sr-only">
              A form that enables instructors to create quizzes for modules
              within a course.
            </DialogDescription>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuiz;
