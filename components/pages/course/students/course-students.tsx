import React from "react";
import StudentCard from "./student-card";
import CourseSectionTitle from "../ui/course-section-title";
import CourseSection from "../ui/course-section";
import { Student } from "@/types/courses";

const CourseStudents = async ({ users }: { users: Student[] }) => {
  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Students</CourseSectionTitle>
          <p className="text-white/80">{users.length} students found</p>
        </div>
      </div>
      <ul className="mx-auto grid max-w-[var(--container-max-width)] grid-cols-3 gap-[1.6rem]">
        {users.map((user) => (
          <li key={user.userId}>
            <StudentCard user={user} />
          </li>
        ))}
      </ul>
    </CourseSection>
  );
};

export default CourseStudents;
