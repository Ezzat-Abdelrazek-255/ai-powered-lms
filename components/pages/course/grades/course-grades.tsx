import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import CourseSectionTitle from "../ui/course-section-title";
import { gradesTableHeadings } from "@/constants/grades";
import CourseSection from "../ui/course-section";

const CourseGrades = () => {
  return (
    <CourseSection>
      <div className="mb-[8rem] border-b-[1px] border-b-white/20">
        <div className="mx-auto mb-[2.4rem] max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Grades</CourseSectionTitle>
          <p className="text-white/80">
            You have 3 Quizzes in the upcoming 3 days
          </p>
        </div>
      </div>
      <div>
        <Table className="mx-auto max-w-[var(--container-max-width)] overflow-hidden rounded-lg bg-beige p-[2.4rem] text-center text-black">
          <TableHeader>
            <TableRow className="!border-b-0">
              {gradesTableHeadings.map((heading) => (
                <TableHead
                  className="p-0 text-center font-mono text-[1.6rem] uppercase text-black first:pl-[4.8rem] last:pr-[4.8rem]"
                  key={heading}
                >
                  <div className="border-b-[1px] border-black/20 pb-[2.4rem] pt-[4.8rem]">
                    {heading}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-[1.4rem] font-bold">
            {[...new Array(12)].map((_, i) => (
              <TableRow key={i} className="group border-0">
                <TableCell className="p-0 pl-[5.6rem]">
                  <div className="border-b-[1px] border-black/20 py-[2.4rem] group-last:pb-[4.8rem]">
                    Assignment {i + 1}
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="border-b-[1px] border-black/20 py-[2.4rem] group-last:pb-[4.8rem]">
                    8
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="border-b-[1px] border-black/20 py-[2.4rem] group-last:pb-[4.8rem]">
                    0 - 15
                  </div>
                </TableCell>
                <TableCell className="p-0 pr-[5.6rem]">
                  <div className="border-b-[1px] border-black/20 py-[2.4rem] group-last:pb-[4.8rem]">
                    53.3%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CourseSection>
  );
};

export default CourseGrades;
