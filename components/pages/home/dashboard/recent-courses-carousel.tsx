import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import RecentCourseCard from "./ui/recent-course-card";
import { Course } from "@/types/courses";

const COLORS = [
  "bg-green text-green-dark",
  "bg-yellow text-yellow-dark",
  "bg-orange text-orange-dark",
  "bg-red text-red-dark",
];

const RecentCoursesCarousel = ({
  recentCourses,
}: {
  recentCourses: Course[];
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-auto cursor-grab overflow-hidden"
    >
      <CarouselContent className="mb-[1.6rem]">
        {recentCourses.map((recentCourse, i) => (
          <CarouselItem
            key={i}
            className={cn(
              "basis-auto",
              "pl-[3.2rem] first:pl-[1.2rem] last:pr-[var(--container-px)]",
            )}
          >
            <RecentCourseCard
              recentCourse={recentCourse}
              className={`${COLORS[i % COLORS.length]}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="relative flex h-24 items-center justify-end gap-[1.6rem] px-[var(--container-px)]">
        <CarouselPrevious className="relative left-0 h-16 w-16 rounded-xs border-white/40 bg-gray-dark hover:bg-beige/50" />
        <CarouselNext className="relative right-0 h-16 w-16 rounded-xs border-white/40 bg-gray-dark hover:bg-beige/50" />
      </div>
    </Carousel>
  );
};

export default RecentCoursesCarousel;
