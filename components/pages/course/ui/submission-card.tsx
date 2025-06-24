import React from "react";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";
import AbstractSvg3 from "../../../../public/vectors/abstract-4.svg";
import DocumentSvg from "../../../../public/vectors/document.svg";
import Link from "next/link";
import { Assignment, Quiz } from "@/types/courses";
import { cn, getUserMetadata } from "@/utils";
import { getSubmissionByAssignmentId } from "@/services/course";
import { createClient } from "@/libs/supabase/server";
import { Button } from "@/components/ui/button";
import CreateAttempt from "../quizzes/create-attempt";

const SubmissionCard = async ({
  variant = "default",
  assignment,
  quiz,
  courseId,
}: {
  variant?: "default" | "quiz";
  assignment?: Assignment;
  quiz?: Quiz;
  courseId: string;
}) => {
  const isQuiz = variant === "quiz";
  const supabase = await createClient();
  const userMetadata = await getUserMetadata(supabase);

  // Get submission only for assignments
  const submission = isQuiz
    ? null
    : await getSubmissionByAssignmentId(
      supabase,
      assignment?.assignmentId || "",
    );

  // Handle dates based on type
  const targetDate = isQuiz
    ? new Date(quiz?.availableDate || "")
    : new Date(assignment?.dueDate || "");

  const endDate = isQuiz ? new Date(quiz?.closeDate || "") : null;

  const dateFormatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(targetDate);

  const weekday = targetDate.toLocaleDateString("en-US", { weekday: "long" });
  const hours = String(targetDate.getHours()).padStart(2, "0");
  const minutes = String(targetDate.getMinutes()).padStart(2, "0");

  const now = new Date();
  const timeDiff = +targetDate - +now;
  const endTimeDiff = endDate ? +endDate - +now : null;

  // Status logic for both assignments and quizzes
  let statusMessage = "";
  let colorClass = "bg-green text-black";
  let buttonText = isQuiz ? "Attempt" : "Submit";
  let buttonDisabled = false;

  if (isQuiz) {
    if (timeDiff > 0) {
      // Quiz hasn't started yet
      const daysLeft = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
      const hoursLeft = Math.ceil(timeDiff / (60 * 60 * 1000));
      const minutesLeft = Math.ceil(timeDiff / (60 * 1000));

      if (daysLeft > 1) {
        statusMessage = `Starts in ${daysLeft} days`;
      } else if (hoursLeft > 1) {
        statusMessage = `Starts in ${hoursLeft} hours`;
      } else if (minutesLeft > 1) {
        statusMessage = `Starts in ${minutesLeft} minutes`;
      } else {
        statusMessage = "Starting soon";
      }

      colorClass = "bg-blue text-white";
      buttonText = "Not Available";
      buttonDisabled = true;
    } else if (endTimeDiff && endTimeDiff > 0) {
      // Quiz is active
      const timeLeftMs = endTimeDiff;

      const seconds = Math.floor(timeLeftMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      if (weeks > 0) {
        statusMessage = `${weeks}w ${days % 7}d remaining`;
      } else if (days > 0) {
        statusMessage = `${days}d ${hours % 24}h remaining`;
      } else if (hours > 0) {
        statusMessage = `${hours}h ${minutes % 60}m remaining`;
      } else if (minutes > 0) {
        statusMessage = `${minutes}m ${seconds % 60}s remaining`;
      } else {
        statusMessage = `${seconds}s remaining`;
      }
      colorClass = "bg-green text-black";
      buttonText = "Attempt";
    } else {
      // Quiz has ended
      statusMessage = "Quiz closed";
      colorClass = "bg-red text-white";
      buttonText = "Closed";
      buttonDisabled = true;
    }
  } else {
    // Assignment logic (existing)
    if (timeDiff < 0) {
      statusMessage = "Assignment is overdue";
      colorClass = "bg-red text-white";
    } else if (timeDiff < 24 * 60 * 60 * 1000) {
      statusMessage = "Due soon (within 24h)";
      colorClass = "bg-yellow text-black";
    } else {
      const daysLeft = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
      statusMessage = `Due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
    }
  }

  // Determine submission status
  const getSubmissionStatus = () => {
    if (isQuiz) {
      console.log(quiz?.attempt);
      if (quiz?.attempt && quiz?.attempt.length > 0) {
        if (quiz.attempt[0].status === "completed") {
          buttonDisabled = true;
          buttonText = "Closed";
        }
        return quiz?.attempt[0].status;
      } else {
        return "Not Attempted";
      }
    }
    return submission ? "Submitted" : "Not Submitted";
  };

  return (
    <article
      className={cn(
        "grid grid-cols-5 items-center justify-between rounded-sm bg-beige px-[1.6rem] py-[2.4rem] leading-[85%] text-black",
        variant === "quiz" && "grid-cols-6",
        userMetadata.role === "instructor" && "grid-cols-4",
        userMetadata.role === "instructor" &&
        variant === "quiz" &&
        "grid-cols-5",
      )}
    >
      {/* Date Column */}
      <h3 className="flex flex-col gap-[0.8rem] leading-[85%]">
        <span className="font-bold">{dateFormatted}</span>
        <span className="text-[1.2rem] text-black/80">
          {weekday}, {hours}:{minutes}
        </span>
      </h3>

      {isQuiz && endDate && (
        <h3>
          <span className="text-[1.4rem] text-black/80">
            Closes:{" "}
            {new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }).format(endDate)}
          </span>
        </h3>
      )}
      {/* Title/Content Column */}
      <div className="flex items-center gap-[0.8rem]">
        <DocumentSvg className="w-[1.6rem]" />
        <div className="flex flex-col gap-[0.8rem]">
          <span className="text-[1.6rem] font-bold">
            {isQuiz ? quiz?.title : assignment?.title}
          </span>
          {isQuiz ? (
            <span className="text-black/80">
              {quiz?.timeLimit} minutes • {quiz?.maxGrade} points
            </span>
          ) : (
            <Link
              download
              href={assignment?.fileUrl || ""}
              className="text-black/80 underline"
            >
              {assignment?.title}
            </Link>
          )}
        </div>
      </div>

      {/* Status Column */}
      <div className="flex flex-col gap-[0.8rem] font-mono uppercase text-black">
        <div className="flex items-center gap-[0.8rem]">
          <AbstractSvg className="w-[1.6rem]" />
          <div className="flex flex-col gap-[0.8rem]">
            <div>{getSubmissionStatus()}</div>
            {submission && !isQuiz && (
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
      </div>

      {/* Time Status Column */}
      <span
        className={cn(
          "flex w-fit items-end gap-[0.8rem] rounded-full p-[0.8rem] font-bold",
          colorClass,
        )}
      >
        <AbstractSvg3 className="h-[1.4rem] fill-current" />
        {statusMessage}
      </span>

      {/* Action Button Column */}
      {userMetadata.role === "student" && (
        <Button
          variant="secondary"
          className="w-fit justify-self-end"
          asChild
          disabled={buttonDisabled}
        >
          {buttonDisabled ? (
            <span>{buttonText}</span>
          ) : isQuiz ? (
            <CreateAttempt courseId={courseId} quizId={quiz?.quizId} />
          ) : (
            <Link
              href={`/course/${courseId}/submissions/${assignment?.assignmentId}`}
            >
              {buttonText}
            </Link>
          )}
        </Button>
      )}
    </article>
  );
};

export default SubmissionCard;
