import { Input } from "@/components/ui/input";
import React from "react";
import SectionTitle from "./ui/section-title";
import { getCourses } from "@/services/course";
import { createClient } from "@/libs/supabase/server";
import CoursesList from "./courses-list";

const CoursesOverview = async () => {
  const supabase = await createClient();
  const courses = await getCourses(supabase);

  return (
    <section className="grid h-full grid-rows-[auto_auto_1fr] pr-[var(--container-px)]">
      <div className="mb-[2.4rem] border-y-[1px] border-y-white/20 py-[2.4rem]">
        <SectionTitle>Courses Overview</SectionTitle>
      </div>
      <Input
        type="search"
        placeholder="Search"
        className="mb-4 w-full border-[1px] border-foreground"
      />
      {courses && <CoursesList courses={courses} />}
    </section>
  );
};

export default CoursesOverview;
