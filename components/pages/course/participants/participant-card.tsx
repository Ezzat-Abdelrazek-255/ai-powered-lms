import { Button } from "@/components/ui/button";
import { Calendar, GraduationCap, School, Settings } from "lucide-react";
import React from "react";

const ParticipantCard = () => {
  return (
    <article className="rounded-[1rem] border-[1px] border-foreground p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="aspect-square w-11 rounded-full bg-muted-foreground"></div>
          <div className="flex flex-col">
            <h3>Student Title</h3>
            <p>Last access to course: 2 secs</p>
          </div>
        </div>
        <Button className="h-[2rem] p-2 text-xs shadow-md">Message</Button>
      </div>
      <ul className="space-y-2 text-xs">
        <li className="flex items-center gap-2">
          <Settings />
          <div className="space-x-1">
            <span className="font-bold">Role:</span>
            <span>Student</span>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <GraduationCap />
          <span className="font-bold">Academic year:</span>
          <div className="space-x-1">
            <span>Junior</span>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <School />
          <div className="space-x-1">
            <span className="font-bold">Department:</span>
            <span>Computer and Systems</span>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <Calendar />
          <div className="space-x-1">
            <span className="font-bold">Course Registration Date:</span>
            <span>2024</span>
          </div>
        </li>
      </ul>
    </article>
  );
};

export default ParticipantCard;
