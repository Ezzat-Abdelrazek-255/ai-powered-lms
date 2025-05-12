"use client";

import CourseSectionTitle from "@/components/pages/course/ui/course-section-title";
import PrimaryButton from "@/components/ui/primary-button";
import AbstractSvg from "@/public/vectors/abstract-1.svg";
import AbstractSvg2 from "@/public/vectors/abstract-2.svg";
import AbstractSvg3 from "@/public/vectors/abstract-3.svg";
import AbstractSvg4 from "@/public/vectors/abstract-4.svg";
import AbstractSvg5 from "@/public/vectors/abstract-5.svg";
import AbstractSvg6 from "@/public/vectors/abstract-6.svg";
import AbstractSvg7 from "@/public/vectors/abstract-7.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Upload from "@/components/ui/upload";

const keys = [
  {
    label: "Resources",
    Icon: AbstractSvg,
  },
  {
    label: "Submission status",
    Icon: AbstractSvg2,
  },
  {
    label: "Grading status",
    Icon: AbstractSvg3,
  },
  {
    label: "Due date",
    Icon: AbstractSvg4,
  },
  {
    label: "Time remaining",
    Icon: AbstractSvg5,
  },
  {
    label: "File submissions",
    Icon: AbstractSvg6,
  },
  {
    label: "Last Modified",
    Icon: AbstractSvg7,
  },
];

const values = [
  "Assignment 1.pdf",
  "Not graded",
  "Not graded",
  "Monday, 7 October",
  "Assignment is overdue by: 66 days",
  "2002012.pdf",
  "",
];

export default function Home() {
  return (
    <main className="pt-[3.2rem]">
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Assignment 1</CourseSectionTitle>
          <p className="text-white/80">Tuesday, 12 November 2024</p>
        </div>
      </div>
      <div className="mx-auto mb-[2.4rem] grid max-w-[var(--container-max-width)] grid-cols-[auto_1fr] rounded-lg bg-beige p-[2.4rem] text-[2.4rem] text-black">
        <div className="w-full border-r-[1px] border-r-black/20 font-semibold">
          {keys.map((key) => (
            <div
              key={key.label}
              className="border-b-[1px] border-b-black/20 py-[2.4rem] pr-[2.4rem] last:border-0"
            >
              <div className="flex items-center gap-[1.6rem]">
                <key.Icon className="h-[2.4rem] w-[2.4rem] fill-black" />
                <p>{key.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="font-mono uppercase">
          {values.map((value) => (
            <div
              key={value}
              className="border-b-[1px] border-y-black/20 py-[2.4rem] pl-[2.4rem] last:border-0"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-center">
            <PrimaryButton>Add Submission</PrimaryButton>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-fit bg-beige">
          <Upload />
        </DialogContent>
      </Dialog>
    </main>
  );
}
