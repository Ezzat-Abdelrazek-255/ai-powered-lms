import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserMetadata } from "@/utils";
import { createClient } from "@/libs/supabase/server";
import { Course } from "@/types/courses";
import CreateModule from "./create-module";
import { getCourseModules } from "@/services/course";
import CourseActions from "./course-actions-dropdown";
import Link from "next/link";
import { AbstractSvg } from "@/components/ui/icons";

async function CourseSidebar({ course }: { course: Course }) {
  const supabase = await createClient();
  const { role, id } = await getUserMetadata(supabase);
  const modules = await getCourseModules(supabase, course.courseId);
  const assignments = modules.flatMap((module) => module.assignment);
  const quizzes = modules.flatMap((module) => module.quiz);

  return (
    <div className="h-full border-r-[1px] border-r-white/20 bg-gray-dark p-[2.4rem]">
      <div className="flex items-center justify-between rounded-sm p-[1.6rem] font-mono transition-colors hover:bg-gray-light">
        <p>{course.title}</p>
        {role === "instructor" && (
          <CreateModule courseId={course.courseId} instructorId={id || ""} />
        )}
      </div>
      {modules.map((module) => (
        <Accordion
          key={module.title}
          type="single"
          collapsible
          className="rounded-xs"
        >
          <AccordionItem value={module.title} className="border-none">
            <div className="flex items-center justify-between rounded-sm p-[1.6rem] transition-colors hover:bg-gray-light">
              <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] p-0 text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
                {module.title}
              </AccordionTrigger>
              <CourseActions
                courseId={course.courseId}
                moduleId={module.moduleId}
              />
            </div>
            <AccordionContent className="px-[3.2rem] py-[0.8rem]">
              <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[1.6rem] text-[1.4rem] text-white/80">
                {module.content.map((item) => (
                  <li key={item.contentId}>
                    <Link
                      download
                      href={item.fileUrl}
                      className="flex items-center gap-2 hover:underline"
                    >
                      <AbstractSvg className="w-6" />
                      {item.fileName}
                    </Link>
                  </li>
                ))}
                {module.assignment.map((item) => (
                  <li key={item.assignmentId}>
                    <Link
                      href={`/course/${course.courseId}/submissions/${item.assignmentId}`}
                      className="flex items-center gap-2 hover:underline"
                    >
                      <AbstractSvg className="w-6" />
                      {item.title}
                    </Link>
                  </li>
                ))}
                {module.quiz.map((item) => (
                  <li key={item.quizId}>
                    <Link
                      href={`/course/${course.courseId}/quizzes/${item.quizId}`}
                      className="flex items-center gap-2 hover:underline"
                    >
                      <AbstractSvg className="w-6" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <Accordion
        key="assignments"
        type="single"
        collapsible
        className="rounded-xs"
      >
        <AccordionItem value="assignments" className="border-none">
          <div className="flex items-center justify-between rounded-sm p-[1.6rem] transition-colors hover:bg-gray-light">
            <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] p-0 text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
              Assignments
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-[3.2rem] py-[0.8rem]">
            <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[1.6rem] text-[1.4rem] text-white/80">
              {assignments.map((assignment) => (
                <li key={assignment.assignmentId}>
                  <Link
                    href={`/course/${course.courseId}/assignments/${assignment.assignmentId}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <AbstractSvg className="w-6" />
                    {assignment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion key="quizzes" type="single" collapsible className="rounded-xs">
        <AccordionItem value="quizzes" className="border-none">
          <div className="flex items-center justify-between rounded-sm p-[1.6rem] transition-colors hover:bg-gray-light">
            <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] p-0 text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
              Quizzes
            </AccordionTrigger>
          </div>
          <AccordionContent className="px-[3.2rem] py-[0.8rem]">
            <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[1.6rem] text-[1.4rem] text-white/80">
              {quizzes.map((quiz) => (
                <li key={quiz.quizId}>
                  <Link
                    href={`/course/${course.courseId}/quizzes/${quiz.quizId}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <AbstractSvg className="w-6" />
                    {quiz.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  // return (
  //   <Sidebar
  //     collapsible="icon"
  //     {...props}
  //     className="top-[var(--header-height)] w-[calc(100vw/6)]"
  //   >
  //     <SidebarContent>
  //       <NavMain items={courses[0].content as ContentBlock[]} />
  //     </SidebarContent>
  //     <SidebarRail />
  //   </Sidebar>
  // );
}

export default CourseSidebar;

// function NavMain({ items }: { items: ContentBlock[] }) {
//   return (
//     <SidebarGroup>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible key={item.title} asChild className="group/collapsible">
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.materials?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <span className="whitespace-nowrap">
//                           {subItem.title}
//                         </span>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
