import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import { courses } from "@/constants/course";
import { ContentBlock } from "@/types/courses";
import CourseAccordion from "./course-accordion";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";

const CourseHome = () => {
  const activeCourseContent = courses[0].content as ContentBlock[];
  return (
    <section className="px-[var(--container-px)]">
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <CourseSectionTitle className="mb-[2.4rem] mt-[3.2rem] text-center">
          ASU111s (UG2018) - Human Rights (28002)
        </CourseSectionTitle>
      </div>

      <div className="mx-auto max-w-[65rem] space-y-[3.2rem]">
        {activeCourseContent.map((content) => (
          <CourseAccordion
            key={content.title}
            trigger={content.title}
            value={content.title}
          >
            <p className="mb-[2.4rem] leading-[150%] text-black/60">
              {content.description}
            </p>
            <ul className="flex flex-col gap-[1.6rem] font-mono uppercase">
              {content.materials?.map((material) => (
                <li
                  key={material.title}
                  className="flex items-center gap-[0.8rem] border-b-black/20 pb-[0.8rem] [&:not(:last-child)]:border-b-[1px]"
                >
                  <AbstractSvg className="h-[1.4rem] w-[1.4rem] fill-black" />
                  <span>{material.title}</span>
                </li>
              ))}
            </ul>
          </CourseAccordion>
        ))}
      </div>
    </section>
  );
};

export default CourseHome;
