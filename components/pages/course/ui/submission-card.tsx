import React from "react";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";
import AbstractSvg2 from "../../../../public/vectors/abstract-2.svg";
import AbstractSvg3 from "../../../../public/vectors/abstract-4.svg";
import DocumentSvg from "../../../../public/vectors/document.svg";
import PrimaryButton from "@/components/ui/primary-button";
import Link from "next/link";

const SubmissionCard = ({
  variant = "default",
}: {
  variant?: "default" | "quiz";
}) => {
  return (
    <Link href="/fhalhfa/submissions/submissionId" className="cursor-pointer">
      <article className="flex items-center justify-between rounded-sm bg-beige px-[1.6rem] py-[2.4rem] leading-[85%] text-black">
        <h3 className="flex flex-col gap-[0.8rem] leading-[85%]">
          <span className="font-bold">12 November 2024</span>
          <span className="text-[1.2rem] text-black/80">Tuesday, 14:15</span>
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
        <div className="flex flex-col gap-[0.8rem] font-mono uppercase text-black">
          <span className="flex items-center gap-[0.8rem]">
            <AbstractSvg className="w-[1.6rem]" />
            {variant === "quiz" ? "Not Attempted" : "Not Submitted"}
          </span>
          <span className="flex items-center gap-[0.8rem]">
            <AbstractSvg2 className="h-[1.6rem]" />
            No feedback
          </span>
        </div>
        <span className="flex items-end gap-[0.8rem] rounded-full bg-red p-[0.8rem] font-bold text-white">
          <AbstractSvg3 className="h-[1.4rem] fill-white" />
          {variant === "quiz"
            ? "Quiz starts in 3 minutes"
            : "Assignment requires action"}
        </span>
        <PrimaryButton variant="secondary">
          {variant === "quiz" ? "Attempt" : "Submit"}
        </PrimaryButton>
      </article>
    </Link>
  );
};

export default SubmissionCard;
