import React from "react";
import ParticipantCard from "./participant-card";
import CourseSectionTitle from "../ui/course-section-title";
import CourseSection from "../ui/course-section";

const CourseParticipants = () => {
  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Participants</CourseSectionTitle>
          <p className="text-white/80">100 participants found</p>
        </div>
      </div>
      <ul className="mx-auto grid max-w-[var(--container-max-width)] grid-cols-3 gap-[1.6rem]">
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
