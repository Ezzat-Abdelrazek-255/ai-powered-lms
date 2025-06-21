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
import PrimaryButton from "@/components/ui/primary-button";
import { createClient } from "@/libs/supabase/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Upload from "@/components/ui/upload";
import { UploadStatus } from "@/types/courses";
import { ClientUploadedFileData } from "uploadthing/types";
import { getUserMetadata } from "@/utils";

const CreateSubmission = ({
  assignmentId,
  disabled = false,
}: {
  assignmentId: string;
  disabled?: boolean;
}) => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadedFiles, setUploadedFiles] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[]
  >([]);
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);

    const user = await getUserMetadata(supabase);

    const { error } = await supabase.from("submission").insert({
      assignment_id: assignmentId,
      student_id: user.id,
      file_url: uploadedFiles[0].ufsUrl,
      file_name: uploadedFiles[0].name,
    });

    setIsLoading(false);

    if (error) {
      console.error("Error inserting submission:", error.message);
      toast.error("Failed to submit assignment. Please try again.");
      return;
    }

    toast.success("Assignment submitted successfully!");
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <PrimaryButton disabled={disabled}>
            {disabled ? "Thanks for Submitting!" : "Add Your Submission"}
          </PrimaryButton>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[54rem] max-w-none bg-beige p-[4.8rem]">
        <DialogTitle className="sr-only">Submit Assignment</DialogTitle>
        <form onSubmit={onSubmit}>
          <h2 className="h4 mb-[3.2rem] text-center uppercase text-black">
            Submit Assignment
          </h2>
          <Upload
            onStatusChange={setUploadStatus}
            onComplete={setUploadedFiles}
          />
          <PrimaryButton
            className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
            isLoading={uploadStatus === "uploading" || isLoading}
            loadingText={
              uploadStatus === "uploading"
                ? "Uploading your file"
                : "Submitting"
            }
            disabled={
              uploadedFiles.length === 0 || uploadStatus !== "done" || isLoading
            }
          >
            Submit Assignment
          </PrimaryButton>
        </form>
        <DialogDescription className="sr-only">
          A form that enables students to submit their submissions.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubmission;
