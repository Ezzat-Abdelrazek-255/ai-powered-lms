import { Course } from "@/types/courses";
import Image from "next/image";
import React from "react";

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({
  course: { title, department, code, keyModules },
}: CourseCardProps) => {
  return (
    <article className="relative z-0 grid grid-cols-[16.4rem_1fr] gap-x-[1.2rem] overflow-hidden rounded-md bg-beige p-[1.6rem] text-black">
      <div className="pointer-events-none absolute inset-0 z-base h-full w-full bg-[url(/images/noise.png)] opacity-40 mix-blend-soft-light" />
      <div className="relative inset-0 z-[-1] h-full w-full overflow-hidden rounded-md">
        <Image
          src="/images/course-sample.png"
          fill
          sizes="90vw"
          className="h-full w-full object-cover object-center saturate-0"
          alt={title}
        />
      </div>
      <div className="pt-[1.6rem]">
        <div className="mb-[1.6rem] flex flex-col gap-[0.8rem]">
          <h3 className="text-[1.8rem] font-bold leading-[85%]">
            {department}
          </h3>
          <p className="font-mono text-[1rem] leading-[85%] text-black/80">
            {code} - {title}
          </p>
        </div>
        <div className="mb-[1.2rem] text-[1rem]">
          <div className="flex flex-col border-y-[1px] border-y-black/20 py-[0.6rem] uppercase">
            <span className="font-bold text-black/80">Taught By:</span>
            <span>Ezzat Abdelrazek</span>
          </div>
          <div className="flex flex-col border-b-[1px] border-b-black/20 py-[0.6rem] uppercase">
            <span className="font-bold text-black/80">Email Address</span>
            <span>Ezzatabdelrazek@gmail.com</span>
          </div>
        </div>
        <div className="font-mono text-[1rem] uppercase">
          <p className="mb-[0.4rem]">Key Modules</p>
          <ul className="rounded-xs bg-white/60 p-[0.6rem] leading-[120%]">
            {keyModules.map((keyModule) => (
              <li key={keyModule}>{keyModule}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
