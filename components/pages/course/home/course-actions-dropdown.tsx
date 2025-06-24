"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AbstractSvg } from "@/components/ui/icons";
import UploadContent from "./upload-content";
import CreateAssignment from "./create-assignment";
import CreateQuiz from "../quizzes/create-quiz";

export default function CourseActions({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="flex items-center gap-[4px] rounded-xs p-[0.8rem] py-[1.2rem] transition-colors hover:bg-gray-dark-2"
        aria-label="Open Course Actions"
      >
        {[...new Array(3)].map((_, i) => (
          <div key={i} className="h-[4px] w-[4px] rounded-full bg-white"></div>
        ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm border border-white/20 bg-gray-dark-2 p-[1.6rem] font-mono uppercase text-white">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="rounded-xs p-[0.8rem] px-[1.2rem] text-[1.6rem] transition-colors hover:!bg-gray-light hover:!text-white"
        >
          <UploadContent courseId={courseId} moduleId={moduleId} />
        </DropdownMenuItem>
        <CreateAssignment
          courseId={courseId}
          moduleId={moduleId}
          dropdownMenuItem={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer rounded-xs p-[0.8rem] px-[1.2rem] text-[1.6rem] transition-colors hover:!bg-gray-light hover:!text-white focus:bg-gray-light"
            >
              <div className="flex items-center gap-[0.8rem]">
                <AbstractSvg className="h-4 w-4 text-white" />
                Create Assignment
              </div>
            </DropdownMenuItem>
          }
        />

        <CreateQuiz
          courseId={courseId}
          moduleId={moduleId}
          dropdownMenuItem={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer rounded-xs p-[0.8rem] px-[1.2rem] text-[1.6rem] transition-colors hover:!bg-gray-light hover:!text-white focus:bg-gray-light"
            >
              <div className="flex items-center gap-[0.8rem]">
                <AbstractSvg className="h-4 w-4 text-white" />
                Create Quiz
              </div>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
