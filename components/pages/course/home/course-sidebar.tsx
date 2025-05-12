import * as React from "react";
import { courses } from "@/constants/course";
import { ContentBlock } from "@/types/courses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// This is sample data.

function CourseSidebar() {
  return (
    <div className="h-full border-r-[1px] border-r-white/20 bg-gray-dark p-[2.4rem]">
      <p className="p-[1.6rem] font-mono">ASU111s (UG2018) - Human Rights </p>
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
