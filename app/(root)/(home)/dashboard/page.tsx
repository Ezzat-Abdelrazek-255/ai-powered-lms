import CoursesOverview from "@/components/pages/home/dashboard/courses-overview";
import DashboardCalender from "@/components/pages/home/dashboard/dashboard-calender";
import RecentCourses from "@/components/pages/home/dashboard/recent-courses";
import Timeline from "@/components/pages/home/dashboard/timeline/timeline";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="grid max-h-[calc(100vh-var(--header-height))] grid-cols-12 grid-rows-12 gap-8 px-[var(--container-padding)] py-8">
      <div className="col-span-8 row-span-3 px-2">
        <RecentCourses />
      </div>
      <div className="col-span-8 row-span-9 overflow-y-auto px-2">
        <CoursesOverview />
      </div>
      <div className="col-span-4 col-start-9 row-span-8 row-start-1 overflow-y-auto px-2">
        <Timeline />
      </div>
      <div className="col-span-4 row-span-4 overflow-y-auto px-2">
        <DashboardCalender />
      </div>
    </div>
  );
};

export default DashboardPage;
