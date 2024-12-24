import { recentlyAccessedCourses } from "@/constants/course";
import React from "react";
import CourseCard from "./ui/course-card";
import SectionTitle from "./ui/section-title";

const RecentCourses = () => {
  return (
    <section className="grid h-full grid-rows-[auto_1fr]">
      <SectionTitle className="mb-4">Recently Access Courses</SectionTitle>
      <ul className="grid h-full w-full grid-cols-4 justify-between gap-8">
        {recentlyAccessedCourses.map((course) => (
          <li key={course.code}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentCourses;
