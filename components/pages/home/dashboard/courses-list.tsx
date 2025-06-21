"use client";

import React, { useState } from "react";
import CourseCard from "./ui/course-card";
import { Course } from "@/types/courses";

const CoursesList = ({ courses }: { courses: Course[] }) => {
  const [hoveredCard, setHoveredCard] = useState("");

  function onMouseEnter(id: string) {
    setHoveredCard(id);
  }

  function onMouseLeave() {
    setHoveredCard("");
  }

  return (
    <ul className="grid h-full grid-cols-3 justify-between gap-8">
      {courses.map((course) => (
        <li
          onMouseEnter={() => onMouseEnter(course.courseId)}
          onMouseLeave={onMouseLeave}
          key={course.courseId}
        >
          <CourseCard
            state={
              hoveredCard
                ? hoveredCard === course.courseId
                  ? "active"
                  : "inactive"
                : ""
            }
            course={course}
          />
        </li>
      ))}
    </ul>
  );
};

export default CoursesList;
