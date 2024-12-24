import React from "react";
import { Button } from "@/components/ui/button";
import RelativeLink from "@/components/ui/relative-link";

const SubmissionCard = () => {
  return (
    <article className="flex items-center justify-between rounded-[0.5rem] border-[1px] border-foreground p-4 leading-[85%]">
      <h3 className="flex flex-col gap-4 leading-[85%]">
        <span className="font-bold">12 November 2024</span>
        <span>Tuesday, 14:15</span>
      </h3>
      <div className="flex flex-col gap-4">
        <span className="font-bold">Initial Reflections</span>
        <span className="text-muted-foreground">Feline Welfare</span>
      </div>
      <div className="flex flex-col gap-4 text-muted-foreground">
        <span>Not Submitted</span>
        <span>No feedback</span>
      </div>
      <span className="font-bold text-destructive">
        Assignment requires action
      </span>
      <Button className="h-[2rem] p-4 shadow-md">
        <RelativeLink href="/fha">Submit</RelativeLink>
      </Button>
    </article>
  );
};

export default SubmissionCard;
