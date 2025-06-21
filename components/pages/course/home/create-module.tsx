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

type Inputs = {
  title: string;
  description: string;
};

const CreateModule = ({
  courseId,
  instructorId,
}: {
  courseId: string;
  instructorId: string;
}) => {
  const supabase = createClient();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const { title, description } = data;

    const { error } = await supabase.from("modules").insert({
      title,
      description,
      course_id: courseId,
      instructor_id: instructorId,
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

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger
        aria-label="Add Module"
        className="rounded-xs p-[0.8rem] transition-colors hover:bg-gray-dark-2"
      >
        <PlusSvg className="h-[1.6rem] w-[1.6rem]" />
      </DialogTrigger>
      <DialogContent className="w-[54rem] max-w-none bg-beige p-[4.8rem]">
        <DialogTitle className="sr-only">Create a new module</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="h4 mb-[3.2rem] text-center uppercase text-black">
            Create a new module
          </h2>
          <div className="mb-[1.2rem] space-y-[0.4rem]">
            <Label>Module title</Label>
            <Input
              inputSize="sm"
              variant="outline"
              required
              placeholder="e.g. Overview"
              {...register("title")}
            />
          </div>
          <div className="mb-[2.4rem] space-y-[0.4rem]">
            <Label>Module description</Label>
            <Textarea
              required
              placeholder="e.g. This course explores Digital Literacy and its importance for teachers and students..."
              {...register("description")}
            />
          </div>
          <PrimaryButton
            className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
            isLoading={isLoading}
            loadingText="Creating module"
          >
            Create Module
          </PrimaryButton>
        </form>
        <DialogDescription className="sr-only">
          A form that enables instructors to create modules within a course.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModule;
