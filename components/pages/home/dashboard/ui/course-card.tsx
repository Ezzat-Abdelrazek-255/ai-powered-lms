import { Course } from "@/types/courses";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({
  course: { coverImgSrc, title, department, code },
}: CourseCardProps) => {
  return (
    <article className="relative z-0 grid h-full items-end overflow-hidden rounded-[0.5rem] py-4 pl-4 text-background">
      <Link href={`/${code}`}>
        <div className="absolute inset-0 z-[-1] h-full w-full">
          <Image
            src={coverImgSrc}
            fill
            sizes="90vw"
            className="h-full w-full object-cover"
            alt={title}
          />
          <div className="absolute inset-0 z-0 bg-black/40"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold leading-[85%]">{department}</h3>
          <p className="text-xs leading-[85%]">
            {code} (UG2018) - {title} (28002)
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CourseCard;
