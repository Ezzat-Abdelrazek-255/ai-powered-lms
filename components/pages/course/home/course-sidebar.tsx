"use client";
import * as React from "react";
import AbstractSvg1 from "../../../../public/vectors/abstract-1-white.svg";
import AbstractSvg2 from "../../../../public/vectors/abstract-2-white.svg";
import AbstractSvg3 from "../../../../public/vectors/abstract-3-white.svg";
import AbstractSvg4 from "../../../../public/vectors/abstract-4-white.svg";
import AbstractSvg5 from "../../../../public/vectors/abstract-5-white.svg";
import Threedots from "@/public/vectors/three-dots.svg";
import { useAuthContext } from "@/contexts/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateModuleButton from "./create-module-button";
import CreateQuizButton from "./create-quiz-button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { useState } from "react";

// This is sample data.

function CourseSidebar() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const { role } = useAuthContext();
  const role = "instructor";

  return (
    <div className="h-full border-r-[1px] border-r-white/20 bg-gray-dark p-[2.4rem]">
      <div className="flex items-center justify-between bg-gray-light p-[1.6rem] font-mono">
        <p className="">ASU111s (UG2018) - Human Rights</p>
        <CreateModuleButton />
      </div>
      <Accordion type="single" collapsible className="rounded-xs">
        <AccordionItem value={"overview"} className="border-none">
          <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] rounded-xs p-[1.6rem] text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
            Overview
          </AccordionTrigger>
          <AccordionContent className="px-[1.6rem]">
            <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[2.4rem] text-[1.4rem] text-white/80">
              <li>Video introduction</li>
              <li>Join the digital literacy discussions forums</li>
              <li>One approach to digital literacy book</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="rounded-xs">
        <AccordionItem value={"overview"} className="border-none">
          <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] p-[1.6rem] text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
            Background reading
          </AccordionTrigger>
          <AccordionContent className="px-[1.6rem]">
            <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[2.4rem] text-[1.4rem] text-white/80">
              <li>Video introduction</li>
              <li>Join the digital literacy discussions forums</li>
              <li>One approach to digital literacy book</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {role === "instructor" ? (
        <>
          <Accordion type="single" collapsible className="rounded-xs">
            <AccordionItem value="facts" className="border-none">
              <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] rounded-xs p-[1.6rem] text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
                Basic Facts
              </AccordionTrigger>
              <AccordionContent className="px-[1.6rem]">
                <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[2.4rem] text-[1.4rem] text-white/80">
                  <li>Video introduction</li>
                  <li>Join the digital literacy discussions forums</li>
                  <li>One approach to digital literacy book</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion
            type="single"
            collapsible
            className="rounded-xs bg-gray-light"
          >
            <AccordionItem
              value="extra-resources "
              className="flex items-baseline justify-between border-none pr-5"
            >
              <AccordionTrigger className="flex flex-row-reverse justify-end gap-[1.2rem] rounded-xs p-[1.6rem] text-[1.6rem] leading-[85%] [&>div]:border-0 [&[data-state=open]_svg]:rotate-[135deg] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:rotate-45 [&_svg]:fill-white">
                Extra Resources
              </AccordionTrigger>

              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-dark-2 px-2">
                  {/* <Threedots /> */}. . .
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-dark p-3 text-white">
                  {/* UPLOAD CONTENT */}
                  <DropdownMenuItem>
                    <AbstractSvg1 className="h-[1.4rem] w-[1.4rem] fill-black" />
                    UPLOAD CONTENT
                  </DropdownMenuItem>
                  {/* CREATE A SUBMISSION */}
                  <DropdownMenuItem>
                    <AbstractSvg2 className="h-[1.4rem] w-[1.4rem] fill-black" />
                    CREATE A SUBMISSION
                  </DropdownMenuItem>
                  {/* Create Quiz */}
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpenDialog(true);
                    }}
                  >
                    <AbstractSvg3 className="h-[1.4rem] w-[1.4rem] fill-black" />
                    Create A Quiz
                  </DropdownMenuItem>

                  {/* DELETE MODULE */}
                  <DropdownMenuItem>
                    <AbstractSvg4 className="h-[1.4rem] w-[1.4rem] fill-black" />
                    DELETE MODULE
                  </DropdownMenuItem>
                  {/* RENAME MODULE */}
                  <DropdownMenuItem>
                    <AbstractSvg5 className="h-[1.4rem] w-[1.4rem] fill-black" />
                    RENAME MODULE
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* <AccordionContent className="px-[1.6rem]">
                <ul className="flex flex-col gap-[1.6rem] border-l-[1px] border-l-white/40 pl-[2.4rem] text-[1.4rem] text-white/80">
                  <li>Video introduction</li>
                  <li>Join the digital literacy discussions forums</li>
                  <li>One approach to digital literacy book</li>
                </ul>
              </AccordionContent> */}
            </AccordionItem>
          </Accordion>
          <CreateQuizButton open={openDialog} onOpenChange={setOpenDialog} />
        </>
      ) : (
        <></>
      )}
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
