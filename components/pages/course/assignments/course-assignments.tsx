import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import SubmissionCard from "../ui/submission-card";
import CourseSection from "../ui/course-section";

const CourseAssignments = () => {
  return (
    <CourseSection>
      <CourseSectionTitle className="mb-12">Assignments</CourseSectionTitle>
      <ul className="flex w-full flex-col gap-4">
        {[...new Array(8)].map((_, i) => (
          <li key={i}>
            <SubmissionCard />
          </li>
        ))}
      </ul>
    </CourseSection>
  );
};

export default CourseAssignments;
