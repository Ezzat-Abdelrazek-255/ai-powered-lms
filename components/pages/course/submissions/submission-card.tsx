"use client";
import React, { useState } from "react";
import AbstractSvg from "@/public/vectors/abstract-1.svg";
import AbstractSvg2 from "@/public/vectors/abstract-2.svg";
import AbstractSvg3 from "@/public/vectors/abstract-4.svg";
import AbstractSvg4 from "@/public/vectors/info.svg";
import DocumentSvg from "@/public/vectors/document.svg";
import PrimaryButton from "@/components/ui/primary-button";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DialogInput from "@/components/ui/dialog-input";

const SubmissionCard = ({
  variant = "default",
}: {
  variant?: "default" | "quiz";
}) => {
  const role = "instructor";

  const [grade, setGrade] = useState("");

  // Check if grade is a valid number
  const isGradeValid = /^\d+(\.\d+)?$/.test(grade);

  return (
    <Link
      href={role !== "instructor" ? "/fhalhfa/submissions/submissionId" : "#"}
      className="cursor-pointer"
    >
      <article className="flex items-center justify-between rounded-sm bg-beige px-[1.6rem] py-[2.4rem] leading-[85%] text-black">
        <h3 className="flex flex-col gap-[0.8rem] leading-[85%]">
          {role === "instructor" ? (
            <>
              <span
                className={`font-bold ${role === "instructor" ? "text-[1.6rem] underline" : ""}`}
              >
                Ezzat Abdelrazek (2001022)
              </span>
              <span className="text-[1.2rem] text-black/80">
                12 November 2024, Tuesday, 14:15
              </span>
            </>
          ) : (
            <>
              <span className="font-bold">12 November 2024</span>
              <span className="text-[1.2rem] text-black/80">
                Tuesday, 14:15
              </span>
            </>
          )}
        </h3>
        <div className="flex items-center gap-[0.8rem]">
          <DocumentSvg className="w-[1.6rem]" />
          <div className="flex flex-col gap-[0.8rem]">
            <span className="text-[1.6rem] font-bold underline">
              Assignment 1
            </span>
            <span className="text-black/80">Feline Welfare</span>
          </div>
        </div>
        <div
          className={`flex flex-col gap-[0.8rem] font-mono uppercase text-black ${
            role === "instructor" ? "justify-center" : ""
          }`}
        >
          <span className="flex items-center gap-[0.8rem]">
            <AbstractSvg className="w-[1.6rem]" />
            {role == "instructor"
              ? "Not Reviewed"
              : variant === "quiz"
                ? "Not Attempted"
                : "Not Submitted"}
          </span>
          {role !== "instructor" && (
            <span className="flex items-center gap-[0.8rem]">
              <>
                <AbstractSvg2 className="h-[1.6rem]" />
                No feedback
              </>
            </span>
          )}
        </div>
        <span
          className={`flex items-end gap-[0.8rem] p-[0.8rem] font-bold ${role === "instructor" ? "text-[1.6rem] underline" : "rounded-full bg-red text-white"}`}
        >
          {role === "instructor" ? (
            <>
              <AbstractSvg4 className="h-[1.4rem]" />
              Submitted Files
            </>
          ) : (
            <>
              <AbstractSvg3 className="h-[1.4rem] fill-white" />
              {variant === "quiz"
                ? "Quiz starts in 3 minutes"
                : "Assignment requires action"}
            </>
          )}
        </span>
        {role !== "instructor" ? (
          <PrimaryButton variant="secondary">
            {variant === "quiz" ? "Attempt" : "Submit"}
          </PrimaryButton>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <PrimaryButton variant="secondary">Review</PrimaryButton>
            </DialogTrigger>
            <DialogContent className="bg-beige sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  <h1 className="text-4xl font-bold text-black">
                    Review Submission
                  </h1>
                  <h2 className="text-2xl font-bold text-gray-dark-2">
                    Ezzat Abdelrazek (2001022)
                  </h2>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-y-4 py-4">
                <DialogInput
                  name="Grade*"
                  placeholder="e.g. 12"
                  id="grade"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setGrade(e.target.value)
                  }
                  value={grade}
                  notes="Max Grade 15"
                />

                <div className="grid grid-cols-1 items-center gap-y-1">
                  <Label
                    htmlFor="username"
                    className="text-xl font-semibold text-gray-light"
                  >
                    Feedback
                  </Label>
                  <textarea
                    id="feedback"
                    placeholder="e.g. Watch out for your calculations"
                    className="rounded-xs border border-gray-light bg-beige px-3 py-2 text-gray-dark-2 placeholder-gray-light"
                  />
                </div>
              </div>
              <DialogFooter className="grid grid-cols-1">
                <Button
                  variant="secondary"
                  type="submit"
                  className={`${!isGradeValid ? "cursor-not-allowed opacity-50" : "bg-blue"}`}
                  disabled={!isGradeValid}
                >
                  Submit Review
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </article>
    </Link>
  );
};

export default SubmissionCard;
