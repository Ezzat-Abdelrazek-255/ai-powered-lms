"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { AbstractSvg } from "@/components/ui/icons";
import { useForm } from "react-hook-form";
import Upload from "@/components/ui/upload";
import PrimaryButton from "@/components/ui/primary-button";
import { ClientUploadedFileData } from "uploadthing/types";
import { UploadStatus } from "@/types/courses";
import Label from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateInput } from "@/components/ui/date-input";
import { createClient } from "@/libs/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { createAssignment } from "@/services/course";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Inputs = {
  title: string;
  maxGrade?: number;
  dueDate: Date;
  description?: string;
};

const CreateAssignment = ({
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
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadedFiles, setUploadedFiles] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const title = watch("title");
  const dueDate = watch("dueDate");

  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true);
      await createAssignment(supabase, {
        course_id: courseId,
        module_id: moduleId,
        title: data.title,
        description: data.description || "",
        file_url: uploadedFiles[0].ufsUrl,
        max_grade: data.maxGrade || 0,
        due_date: dueDate,
      });
      toast.success("Assignment Created Successfully!");
      setIsOpen(false);
      reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create assignment. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      {dropdownMenuItem ? (
        <DialogTrigger asChild>{dropdownMenuItem}</DialogTrigger>
      ) : (
        <DialogTrigger className="flex items-center gap-[0.8rem]">
          <AbstractSvg className="h-4 w-4 text-white" />
          Create Assignment
        </DialogTrigger>
      )}
      <DialogContent className="w-[54rem] max-w-none bg-beige p-[4.8rem]">
        <DialogTitle className="sr-only">Create Assignmet</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-[2.4rem]">
            <h2 className="h4 mb-[3.2rem] text-center uppercase text-black">
              Create Assignment
            </h2>
            <div className="grid grid-cols-2 gap-x-[1.6rem]">
              <div className="space-y-[0.4rem]">
                <Label htmlFor="title">Assignment title</Label>
                <Input
                  id="title"
                  type="text"
                  inputSize="sm"
                  variant="outline"
                  placeholder="e.g. Assignment 1"
                  {...register("title")}
                  className="mb-4 w-full"
                />
              </div>
              <div className="space-y-[0.4rem]">
                <Label required={false} htmlFor="maxGrade">
                  Max grade
                </Label>
                <Input
                  id="maxGrade"
                  type="number"
                  inputSize="sm"
                  variant="outline"
                  placeholder="Max Grade"
                  {...register("maxGrade")}
                  className="mb-4 w-full"
                />
              </div>
            </div>
            <DateInput
              value={dueDate}
              onChange={(date) => {
                setValue("dueDate", new Date(date!), { shouldValidate: true });
              }}
              label="Due Date"
              placeholder="Select end date"
            />
            <div className="space-y-[0.8rem]">
              <Label required={false} htmlFor="description">
                Assignment description
              </Label>
              <Textarea
                id="description"
                placeholder="e.g. This assignment explores Digital Literacy and its importance for teachers and students..."
                {...register("description")}
              />
            </div>
            <div className="space-y-[0.4rem]">
              <Label>Assignment resources</Label>
              <Upload
                onStatusChange={setUploadStatus}
                onComplete={setUploadedFiles}
              />
            </div>
          </div>
          <PrimaryButton
            type="submit"
            isLoading={uploadStatus === "uploading" || isLoading}
            loadingText={
              uploadStatus === "uploading"
                ? "Uploading your file"
                : "Submitting"
            }
            disabled={
              !title ||
              !dueDate ||
              uploadedFiles.length === 0 ||
              uploadStatus !== "done" ||
              isLoading
            }
            className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
          >
            Submit
          </PrimaryButton>
        </form>

        <DialogDescription className="sr-only">
          A form that enables instructors to create Assignmets to modules within
          a course.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignment;
