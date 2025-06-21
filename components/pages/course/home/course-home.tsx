import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import { Course } from "@/types/courses";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";
import CourseHomeAccordion from "./course-home-accordion";
import Link from "next/link";
import { getCourseModules } from "@/services/course";
import { createClient } from "@/libs/supabase/server";

const CourseHome = async ({ course }: { course: Course }) => {
  const supabase = await createClient();
  const modules = await getCourseModules(supabase, course.courseId);
  return (
    <section className="px-[var(--container-px)]">
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <CourseSectionTitle className="mb-[2.4rem] mt-[3.2rem] text-center">
          {course.title}
        </CourseSectionTitle>
      </div>

      <div className="mx-auto max-w-[65rem] space-y-[3.2rem]">
        {modules?.map((module) => (
          <CourseHomeAccordion
            key={module.title}
            trigger={module.title}
            value={module.title}
          >
            <p className="mb-[2.4rem] leading-[150%] text-black/60">
              {module.description}
            </p>
            <ul className="flex flex-col gap-[1.6rem] font-mono uppercase">
              {module.content?.map((content) => (
                <li
                  key={content.fileName}
                  className="flex items-center gap-[0.8rem] border-b-black/20 pb-[0.8rem] [&:not(:last-child)]:border-b-[1px]"
                >
                  <AbstractSvg className="h-[1.4rem] w-[1.4rem] fill-black" />
                  <Link className="hover:underline" href={content.fileUrl}>
                    {content.fileName}
                  </Link>
                </li>
              ))}
              {module.assignment?.map((assignment) => (
                <li
                  key={assignment.assignmentId}
                  className="flex items-center gap-[0.8rem] border-b-black/20 pb-[0.8rem] [&:not(:last-child)]:border-b-[1px]"
                >
                  <AbstractSvg className="h-[1.4rem] w-[1.4rem] fill-black" />
                  <Link
                    className="hover:underline"
                    href={`/course/${course.courseId}/submissions/${assignment.assignmentId}`}
                  >
                    {assignment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </CourseHomeAccordion>
        ))}
      </div>
    </section>
  );
};

export default CourseHome;
