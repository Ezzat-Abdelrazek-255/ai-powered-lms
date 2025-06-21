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
import { Textarea } from "@/components/ui/textarea";
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
  title: string;
  description: string;
};

const CreateQuestion = ({
  courseId,
}: {
  courseId: string;
  instructorId: string;
}) => {
  const supabase = createClient();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [options, setOptions] = useState<{ id: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (options.length === 1) {
      toast.error("Please add at least two options");
      return;
    }
    setIsLoading(true);

    const { title, description } = data;

    const { error } = await supabase.from("modules").insert({
      title,
      description,
      course_id: courseId,
    });

    setIsLoading(false);

    if (error) {
      console.error("Error inserting module:", error.message);
      toast.error("Failed to create module. Please try again.");
      return;
    }

    toast.success("Module created successfully!");
    setIsOpen(false);
    reset();
    router.refresh();
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
        className="rounded-xs p-[0.8rem] transition-colors hover:bg-gray-dark-2"
      >
        <PlusSvg className="h-[1.6rem] w-[1.6rem]" />
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
            <Select>
              <SelectTrigger className="h-auto w-full rounded-xs border-0 bg-gray-light px-[0.8rem] py-[1.2rem] font-mono uppercase leading-none">
                <SelectValue placeholder="Right Option" />
              </SelectTrigger>
              <SelectContent className="rounded-xs bg-gray-dark p-[0.8rem] text-white">
                {options.map((option) => (
                  <SelectItem
                    className="hover:bg-gray-lightrounded-xs transition-colors"
                    key={option.id}
                    value={option.text}
                  >
                    {option.text}
                  </SelectItem>
                ))}
                <SelectItem
                  className="rounded-xs font-mono uppercase transition-colors hover:bg-gray-light"
                  value="dark"
                >
                  Dark
                </SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PrimaryButton
            className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
            isLoading={isLoading}
            loadingText="Creating module"
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
