"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AbstractSvg } from "@/components/ui/icons";
import PrimaryButton from "@/components/ui/primary-button";
import Upload from "@/components/ui/upload";
import { UploadStatus } from "@/types/courses";
import { ClientUploadedFileData } from "uploadthing/types";
import { createClient } from "@/libs/supabase/client";
import { createContent } from "@/services/course";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UploadContent = ({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadedFiles, setUploadedFiles] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const onSubmit = async function(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const data = uploadedFiles.map((file) => ({
        course_id: courseId,
        module_id: moduleId,
        file_url: file.ufsUrl,
        file_name: file.name,
      }));
      await createContent(supabase, data);
      setIsOpen(false);
      toast.success("Content uploaded successfully!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger className="flex items-center gap-[0.8rem]">
        <AbstractSvg className="h-4 w-4 text-white" />
        Upload content
      </DialogTrigger>
      <DialogContent className="w-[54rem] max-w-none bg-beige p-[4.8rem]">
        <DialogTitle className="sr-only">Upload Content</DialogTitle>

        <form onSubmit={onSubmit}>
          <h2 className="h4 mb-[3.2rem] text-center uppercase text-black">
            Upload
          </h2>
          <Upload
            onStatusChange={setUploadStatus}
            onComplete={setUploadedFiles}
          />
          <PrimaryButton
            type="submit"
            isLoading={uploadStatus === "uploading" || isLoading}
            loadingText={
              uploadStatus === "uploading"
                ? "Uploading your file"
                : "Submitting"
            }
            disabled={uploadStatus !== "done" || isLoading}
            className="w-full bg-blue text-white hover:bg-blue disabled:bg-black"
          >
            Submit
          </PrimaryButton>
        </form>
        <DialogDescription className="sr-only">
          A form that enables instructors to upload content to modules within a
          course.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UploadContent;
