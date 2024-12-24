import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import { courses } from "@/constants/course";
import { ContentBlock } from "@/types/courses";
import CourseAccordion from "./course-accordion";

const CourseHome = () => {
  const activeCourseContent = courses[0].content as ContentBlock[];
  return (
    <section className="py-8">
      <CourseSectionTitle className="mb-20">
        ASU111s (UG2018) - Human Rights (28002)
      </CourseSectionTitle>

      <div className="mx-auto max-w-[650px]">
        {activeCourseContent.map((content) => (
          <CourseAccordion
            key={content.title}
            trigger={content.title}
            value={content.title}
          >
            <p className="mb-6 text-muted-foreground">{content.description}</p>
            <ul className="flex flex-col gap-4">
              {content.materials?.map((material) => (
                <li
                  key={material.title}
                  className="flex items-center gap-2 border-b-border pb-2 [&:not(:last-child)]:border-b-[1px]"
                >
                  <span>{material.icon && <material.icon />}</span>
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
