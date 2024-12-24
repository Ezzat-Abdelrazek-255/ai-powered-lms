import { Input } from "@/components/ui/input";
import { courses } from "@/constants/course";
import React from "react";
import CourseCard from "./ui/course-card";
import SectionTitle from "./ui/section-title";

const CoursesOverview = () => {
  return (
    <section className="grid h-full grid-rows-[auto_auto_1fr]">
      <SectionTitle className="mb-4">Courses Overview</SectionTitle>
      <Input
        type="search"
        placeholder="Search"
        className="mb-4 w-full border-[1px] border-foreground"
      />
      <ul className="grid h-full grid-cols-4 justify-between gap-8">
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
