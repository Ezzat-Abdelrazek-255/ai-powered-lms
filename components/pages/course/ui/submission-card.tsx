import React from "react";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";
import AbstractSvg3 from "../../../../public/vectors/abstract-4.svg";
import DocumentSvg from "../../../../public/vectors/document.svg";
import Link from "next/link";
import { Assignment } from "@/types/courses";
import { cn } from "@/utils";
import { getSubmissionByAssignmentId } from "@/services/course";
import { createClient } from "@/libs/supabase/server";
import { Button } from "@/components/ui/button";

const SubmissionCard = async ({
  variant = "default",
  assignment,
  courseId,
}: {
  variant?: "default" | "quiz";
  assignment?: Assignment;
  courseId: string;
}) => {
  const isQuiz = variant === "quiz";
  const supabase = await createClient();
  const submission = isQuiz
    ? null
    : await getSubmissionByAssignmentId(
      supabase,
      assignment?.assignmentId || "",
    );

  const dueDate = isQuiz ? null : new Date(assignment?.dueDate || "");
  const dueDateFormatted = dueDate
    ? new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(dueDate)
    : null;

  const weekday = dueDate
    ? dueDate.toLocaleDateString("en-US", { weekday: "long" })
    : null;

  const hours = dueDate ? String(dueDate.getHours()).padStart(2, "0") : null;
  const minutes = dueDate
    ? String(dueDate.getMinutes()).padStart(2, "0")
    : null;

  const now = new Date();
  const timeDiff = dueDate ? +dueDate - +now : null;

  let statusMessage = "";
  let colorClass = "bg-green text-black";
  if (timeDiff && timeDiff < 0) {
    statusMessage = "Assignment is overdue";
    colorClass = "bg-red text-white";
  } else if (timeDiff && timeDiff < 24 * 60 * 60 * 1000) {
    statusMessage = "Due soon (within 24h)";
    colorClass = "bg-yellow text-black";
  } else if (timeDiff) {
    const daysLeft = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    statusMessage = `Due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
  }

  return (
    <article className="flex items-center justify-between rounded-sm bg-beige px-[1.6rem] py-[2.4rem] leading-[85%] text-black">
      <h3 className="flex flex-col gap-[0.8rem] leading-[85%]">
        <span className="font-bold">{dueDateFormatted}</span>
        <span className="text-[1.2rem] text-black/80">
          {weekday}, {hours}:{minutes}
        </span>
      </h3>
      <div className="flex items-center gap-[0.8rem]">
        <DocumentSvg className="w-[1.6rem]" />
        <div className="flex flex-col gap-[0.8rem]">
          <span className="text-[1.6rem] font-bold">
            {assignment && assignment.title}
          </span>
          <Link
            download
            href={assignment?.fileUrl || ""}
            className="text-black/80 underline"
          >
            {assignment?.title}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem] font-mono uppercase text-black">
        <div className="flex items-center gap-[0.8rem]">
          <AbstractSvg className="w-[1.6rem]" />
          <div className="flex flex-col gap-[0.8rem]">
            <div>
              {variant === "quiz"
                ? "Not Attempted"
                : submission
                  ? "Submitted"
                  : "Not Submitted"}
            </div>
            {submission && (
              <Link
                download
                href={submission.fileUrl || ""}
                className="underline"
                target="_blank"
              >
                {submission?.fileName}
              </Link>
            )}
          </div>
        </div>
        {/* TODO */}
        {/* <span className="flex items-center gap-[0.8rem]"> */}
        {/*   <AbstractSvg2 className="h-[1.6rem]" /> */}
        {/*   No feedback */}
        {/* </span> */}
      </div>
      <span
        className={cn(
          "flex items-end gap-[0.8rem] rounded-full bg-red p-[0.8rem] font-bold text-white",
          colorClass,
        )}
      >
        <AbstractSvg3 className="h-[1.4rem] fill-white" />
        {variant === "quiz" ? "Quiz starts in 3 minutes" : statusMessage}
      </span>
      <Button variant="secondary" asChild>
        <Link
          href={`/course/${courseId}/submissions/${assignment?.assignmentId}`}
        >
          {variant === "quiz" ? "Attempt" : "Submit"}
        </Link>
      </Button>
    </article>
  );
};

export default SubmissionCard;
