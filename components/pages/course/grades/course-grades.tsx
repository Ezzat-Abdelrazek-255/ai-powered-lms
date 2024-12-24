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
      <CourseSectionTitle className="mb-12">Grades</CourseSectionTitle>
      <Table>
        <TableHeader>
          <TableRow>
            {gradesTableHeadings.map((heading) => (
              <TableHead className="[&:last-child]:text-right" key={heading}>
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...new Array(12)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>Assignment {i + 1}</TableCell>
              <TableCell>8</TableCell>
              <TableCell>0 - 15</TableCell>
              <TableCell>53.3%</TableCell>
              <TableCell className="text-right">12%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CourseSection>
  );
};

export default CourseGrades;
