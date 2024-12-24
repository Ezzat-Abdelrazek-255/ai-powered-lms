import React from "react";
import ParticipantCard from "./participant-card";
import CourseSectionTitle from "../ui/course-section-title";
import CourseSection from "../ui/course-section";

const CourseParticipants = () => {
  return (
    <CourseSection>
      <CourseSectionTitle className="mb-12">Participants</CourseSectionTitle>
      <ul className="grid grid-cols-3 gap-4">
        {[...new Array(9)].map((_, i) => (
          <li key={i}>
            <ParticipantCard />
          </li>
        ))}
      </ul>
    </CourseSection>
  );
};

export default CourseParticipants;
