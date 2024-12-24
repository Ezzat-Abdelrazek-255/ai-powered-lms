import { Input } from "@/components/ui/input";
import React from "react";
import SectionTitle from "../ui/section-title";
import { timelineItems } from "@/constants/timeline";
import TimelineCard from "./timeline-card";

const Timeline = () => {
  return (
    <section>
      <SectionTitle className="mb-4">Timeline</SectionTitle>
      <Input
        type="search"
        placeholder="Search"
        className="mb-4 w-full border-[1px] border-foreground"
      />
      <ul className="flex flex-col gap-4">
        {timelineItems.map((item) => (
          <li key={item.title}>
            <TimelineCard timelineItem={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Timeline;
