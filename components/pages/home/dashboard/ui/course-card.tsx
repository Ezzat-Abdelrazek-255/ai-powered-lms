import { Course } from "@/types/courses";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course, state }: { course: Course; state: string }) => {
  const instructors = course.instructor;
  return (
    <Link
      href={`/course/${course.courseId}`}
      className={cn(
        "group/item relative z-0 grid grid-cols-[16.4rem_1fr] gap-x-[1.2rem] overflow-hidden rounded-md bg-beige p-[1.6rem] text-black transition-all",
        state === "active" && "opacity-100 blur-[0px]",
        state === "inactive" && "opacity-40 blur-[2px]",
      )}
    >
      <span className="pointer-events-none absolute inset-0 z-base block h-full w-full bg-[url(/images/noise.png)] opacity-40 mix-blend-soft-light transition-all" />
      <span className="relative inset-0 z-[-1] block h-full w-full overflow-hidden rounded-md">
        <Image
          src={course.coverImg}
          fill
          sizes="90vw"
          className="h-full w-full object-cover object-center saturate-0 transition-all group-hover/item:scale-110 group-hover/item:saturate-100"
          alt={course.title}
        />
        <span className="absolute inset-0 z-10 grid h-full w-full place-content-center bg-black/80 text-center text-[2.4rem] font-bold leading-tight text-white opacity-0 transition-all group-hover/item:opacity-100">
          Click to
          <br />
          Peek Inside
        </span>
      </span>
      <span className="block pt-[1.6rem]">
        <span className="mb-[1.6rem] flex flex-col gap-[1.2rem]">
          <span className="flex items-center justify-between">
            <h3 className="text-[1.8rem] font-bold leading-none">
              {course.department}
            </h3>
            <span className="w-fit rounded-full bg-green px-[1.2rem] pb-[0.4rem] pt-[0.8rem] text-[1rem] font-bold uppercase leading-none text-green-dark">
              {course.status}
            </span>
          </span>
          <p className="flex flex-col gap-[0.4rem] font-mono text-[1rem] leading-none text-black/80">
            <span>{course.title}</span>
          </p>
        </span>
        <span className="mb-[1.2rem] block text-[1rem]">
          <span className="flex flex-col border-y-[1px] border-y-black/20 py-[0.6rem] uppercase">
            <span className="font-bold text-black/80">Taught By:</span>
            <span className="flex items-center gap-[0.4rem]">
              {instructors.map((instructor, i) => (
                <span
                  className="flex items-center gap-[0.4rem]"
                  key={instructor.name}
                >
                  <span>{instructor.name}</span>
                  {instructors.length - 1 !== i && <span>&</span>}
                </span>
              ))}
            </span>
          </span>
          <span className="flex flex-col border-b-[1px] border-b-black/20 py-[0.6rem] uppercase">
            <span className="font-bold text-black/80">Email Address</span>
            {instructors.map((instructor) => (
              <span key={instructor.name}>{instructor.email}</span>
            ))}
          </span>
        </span>
        <span className="block font-mono text-[1rem] uppercase">
          <p className="mb-[0.4rem]">Key Modules</p>
          <ul className="rounded-xs bg-white/60 p-[0.6rem] leading-[120%]">
            {course.keyModules.map((keyModule) => (
              <li key={keyModule.keyModulesId}>{keyModule.title}</li>
            ))}
          </ul>
        </span>
      </span>
    </Link>
  );
};

export default CourseCard;
