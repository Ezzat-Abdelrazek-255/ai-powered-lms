import CourseSectionTitle from "@/components/pages/course/ui/course-section-title";
import AbstractSvg from "@/public/vectors/abstract-1.svg";
import AbstractSvg2 from "@/public/vectors/abstract-2.svg";
import AbstractSvg3 from "@/public/vectors/abstract-3.svg";
import AbstractSvg4 from "@/public/vectors/abstract-4.svg";
import AbstractSvg5 from "@/public/vectors/abstract-5.svg";
import AbstractSvg6 from "@/public/vectors/abstract-6.svg";
import { getAssignment, getSubmissionByAssignmentId } from "@/services/course";
import { createClient } from "@/libs/supabase/server";
import { intervalToDuration } from "date-fns";
import Link from "next/link";
import CreateSubmission from "@/components/pages/course/assignments/create-submission";

const keys = [
  {
    label: "Resources",
    Icon: AbstractSvg,
  },
  {
    label: "Submission status",
    Icon: AbstractSvg2,
  },
  {
    label: "Grading status",
    Icon: AbstractSvg3,
  },
  {
    label: "Due date",
    Icon: AbstractSvg4,
  },
  {
    label: "Time remaining",
    Icon: AbstractSvg5,
  },
  {
    label: "File submissions",
    Icon: AbstractSvg6,
  },
];

export default async function Home({
  params: { submissionId },
}: {
  params: { submissionId: string };
}) {
  const supabase = await createClient();
  const assignment = await getAssignment(supabase, submissionId);
  const submission = await getSubmissionByAssignmentId(supabase, submissionId);

  const dueDateFormatted = new Date(assignment.dueDate).toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    },
  );
  const dueTs = Date.parse(assignment.dueDate);
  const nowTs = Date.now();

  const isOverdue = dueTs < nowTs;
  const remainingMs = Math.abs(dueTs - nowTs);

  const duration = intervalToDuration({ start: 0, end: remainingMs });
  const parts = [];
  if (duration.days) parts.push(`${duration.days}d`);
  if (duration.hours) parts.push(`${duration.hours}h`);
  if (duration.minutes) parts.push(`${duration.minutes}m`);
  const human = parts.length ? parts.join(" ") : "less than a minute";

  const statusMessage = isOverdue
    ? `Overdue by ${human}`
    : `Time remaining: ${human}`;

  const submissionStatus = submission
    ? submission.submissionStatus
    : "Not Submitted";

  const values = [
    <Link
      className="underline transition-colors hover:text-black/80"
      key={assignment.assignmentId}
      download
      href={assignment.fileUrl}
    >
      {assignment.title}
    </Link>,
    submissionStatus,
    submissionStatus,
    new Date(dueTs).toLocaleDateString(),
    statusMessage,
    <Link
      className="underline transition-colors hover:text-black/80"
      key={submission?.submissionId}
      download
      href={submission?.fileUrl || ""}
    >
      {submission ? submission.fileName : ""}
    </Link>,
  ];

  return (
    <main className="pt-[3.2rem]">
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>{assignment.title}</CourseSectionTitle>
          <p className="text-white/80">{dueDateFormatted}</p>
        </div>
      </div>
      <div className="mx-auto mb-[2.4rem] grid max-w-[var(--container-max-width)] grid-cols-[auto_1fr] rounded-lg bg-beige p-[2.4rem] text-[2.4rem] text-black">
        <div className="w-full border-r-[1px] border-r-black/20 font-semibold">
          {keys.map((key) => (
            <div
              key={key.label}
              className="border-b-[1px] border-b-black/20 py-[2.4rem] pr-[2.4rem] last:border-0"
            >
              <div className="flex items-center gap-[1.6rem]">
                <key.Icon className="h-[2.4rem] w-[2.4rem] fill-black" />
                <p>{key.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="font-mono uppercase">
          {values.map((value, i) => (
            <div
              key={i}
              className="border-b-[1px] border-y-black/20 py-[2.4rem] pl-[2.4rem] last:border-0"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <CreateSubmission disabled={!!submission} assignmentId={submissionId} />
      </div>
    </main>
  );
}
