import { recentlyAccessedCourses } from "@/constants/course";
import React from "react";
import SectionTitle from "./ui/section-title";
import RecentCoursesCarousel from "./recent-courses-carousel";

const RecentCourses = () => {
  return (
    <section className="grid h-full grid-rows-[auto_1fr]">
      <div className="mb-[2.4rem] border-b-[1px] border-b-white/20 pb-[2.4rem]">
        <SectionTitle>Recently Access Courses</SectionTitle>
      </div>
      <RecentCoursesCarousel recentCourses={recentlyAccessedCourses} />
    </section>
  );
};

export default RecentCourses;
