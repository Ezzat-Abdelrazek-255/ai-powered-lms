import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TimelineItem } from "@/types/timeline";
import React from "react";

type TimelineCardProps = { timelineItem: TimelineItem };

const dateOptions = {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
} as const;

const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
} as const;

const TimelineCard = ({
  timelineItem: { title, associatedCourse, deadline, requiresAction },
}: TimelineCardProps) => {
  const date = new Intl.DateTimeFormat("en-GB", dateOptions).format(deadline);
  const time = new Intl.DateTimeFormat("en-GB", timeOptions).format(deadline);
  return (
    <article className="flex flex-col gap-6 rounded-[0.5rem] border-[1px] border-foreground p-4 leading-[85%]">
      <h3 className="flex items-center justify-between font-bold">
        <span className="text-2xl">{date}</span>
        <span>{time}</span>
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">{title}</p>
          <p
            className={cn(
              "flex items-center",
              requiresAction && "text-destructive",
            )}
          >
            {requiresAction && <span>Assignment requires action - </span>}
            <span>{associatedCourse}</span>
          </p>
        </div>
        <Button className="h-[2rem] self-end p-2 shadow-md">
          Add Submission
        </Button>
      </div>
    </article>
  );
};

export default TimelineCard;
