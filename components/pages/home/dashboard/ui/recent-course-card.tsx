import { Course } from "@/types/courses";
import { cn } from "@/utils";
import React from "react";

const RecentCourseCard = ({
  recentCourse,
  className,
}: {
  recentCourse: Course;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        "relative flex h-[45.3rem] w-[33.9rem] flex-col justify-between rounded-xs bg-green p-[1.6rem] text-black",
        className,
      )}
    >
      <div className="flex justify-between font-mono uppercase">
        <p>{recentCourse.title}</p>
        <p>{recentCourse.code}</p>
      </div>
      <h3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[6.4rem] font-bold uppercase leading-[85%]">
        {recentCourse.department}
      </h3>
      <ul className="text-center font-mono uppercase leading-[120%]">
        {recentCourse.keyModules.map((module) => (
          <li key={module}>{module}</li>
        ))}
      </ul>
    </article>
  );
};

export default RecentCourseCard;
