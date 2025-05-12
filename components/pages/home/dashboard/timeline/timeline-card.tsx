import PrimaryButton from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";
import { TimelineItem } from "@/types/timeline";
import React from "react";
import AbstractSvg from "../../../../../public/vectors/abstract-6.svg";
import ArrowSvg from "../../../../../public/vectors/arrow.svg";

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
    <article className="flex flex-col gap-6 rounded-sm bg-gray-dark p-[1.6rem] leading-[85%]">
      <h3 className="flex items-start justify-between font-mono">
        <span className="flex flex-col gap-[0.8rem]">
          <span>{date}</span>
          <span className="text-[1rem] text-white/80">
            {associatedCourse.code} - {associatedCourse.title}
          </span>
        </span>
        <span>{time}</span>
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between border-y-[1px] border-white/40 py-[0.8rem] font-bold">
            <div className="flex items-center gap-[0.6rem]">
              <AbstractSvg className="w-[1.6rem] fill-white" />
              <p>{title}</p>
            </div>
            <ArrowSvg className="w-[1.6rem] fill-white" />
          </div>
          <p
            className={cn(
              "flex items-center",
              requiresAction && "text-destructive",
            )}
          >
            {/* {requiresAction && <span>Assignment requires action </span>} */}
          </p>
        </div>
        <PrimaryButton className="self-end">Add Submission</PrimaryButton>
      </div>
    </article>
  );
};

export default TimelineCard;
