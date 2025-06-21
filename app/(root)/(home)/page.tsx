import CoursesOverview from "@/components/pages/home/dashboard/courses-overview";
// import RecentCourses from "@/components/pages/home/dashboard/recent-courses";
// import Timeline from "@/components/pages/home/dashboard/timeline/timeline";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-12 gap-8 gap-x-0 px-[var(--container-padding)] pt-[3.2rem]">
      <div className="col-span-9 col-start-1 row-start-1 border-r-[1px] border-r-white/20">
        <div className="mb-[4rem] overflow-hidden">
          {/* <RecentCourses /> */}
        </div>
        <div>
          <CoursesOverview />
        </div>
      </div>
      <div className="col-span-3 row-start-1">{/* <Timeline /> */}</div>
    </div>
  );
};

export default DashboardPage;
