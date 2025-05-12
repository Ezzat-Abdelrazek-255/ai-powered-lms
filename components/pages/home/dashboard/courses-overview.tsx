import { Input } from "@/components/ui/input";
import { courses } from "@/constants/course";
import React from "react";
import CourseCard from "./ui/course-card";
import SectionTitle from "./ui/section-title";

const CoursesOverview = () => {
  return (
    <section className="grid h-full grid-rows-[auto_auto_1fr] pr-[var(--container-px)]">
      <div className="mb-[2.4rem] border-y-[1px] border-y-white/20 py-[2.4rem]">
        <SectionTitle>Courses Overview</SectionTitle>
      </div>
      <Input
        type="search"
        placeholder="Search"
        className="mb-4 w-full border-[1px] border-foreground"
      />
      <ul className="grid h-full grid-cols-3 justify-between gap-8">
        {courses.map((course) => (
          <li key={course.code}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CoursesOverview;
