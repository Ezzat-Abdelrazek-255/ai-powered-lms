import { Input } from "@/components/ui/input";
import React from "react";
import SectionTitle from "../ui/section-title";
import { timelineItems } from "@/constants/timeline";
import TimelineCard from "./timeline-card";

const Timeline = () => {
  return (
    <section>
      <div className="mb-[2.4rem] border-b-[1px] border-b-white/20 pb-[2.4rem]">
        <SectionTitle className="pl-[var(--container-px)]">
          Timeline
        </SectionTitle>
      </div>
      <div className="pl-[var(--container-px)]">
        <Input type="search" placeholder="Search" className="mb-[2.4rem]" />
        <ul className="flex flex-col gap-4">
          {timelineItems.map((item) => (
            <li key={item.title}>
              <TimelineCard timelineItem={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;
