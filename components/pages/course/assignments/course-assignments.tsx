import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import SubmissionCard from "../ui/submission-card";
import CourseSection from "../ui/course-section";
import { createClient } from "@/libs/supabase/server";
import { getAssignments } from "@/services/course";

const CourseAssignments = async ({ courseId }: { courseId: string }) => {
  const supabase = await createClient();
  const assignments = await getAssignments(supabase, courseId);
  const now = Date.now();
  const oneWeekFromNow = now + 7 * 24 * 60 * 60 * 1000;

  const dueInWeek = assignments?.filter(
    (assignment) =>
      Date.parse(assignment.dueDate) <= oneWeekFromNow &&
      Date.parse(assignment.dueDate) >= now,
  );

  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Submissions</CourseSectionTitle>
          <p className="text-white/80">
            {dueInWeek?.length} submissions due date in the upcoming 7 days
          </p>
        </div>
      </div>
      <ul className="mx-auto flex w-full max-w-[var(--container-max-width)] flex-col gap-4">
        {assignments?.map((assignment) => (
          <li key={assignment.assignmentId}>
            <SubmissionCard courseId={courseId} assignment={assignment} />
          </li>
        ))}
      </ul>
    </CourseSection>
  );
};

export default CourseAssignments;
