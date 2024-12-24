import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

const QuizSidebar = () => {
  return (
    <div className="sticky right-0 top-0 rounded-[1rem] border-[1px] border-foreground p-4">
      <ul className="mb-4 flex flex-col">
        {[...new Array(5)].map((_, i) => (
          <li key={i}>
            <Button
              className="items-start gap-0 px-2 py-8 [&_svg]:size-6"
              variant="ghost"
              asChild
            >
              <div className="flex w-full items-center gap-2">
                <Info className="text-destructive" />
                <Link href={`#question-${i + 1}`} className="flex flex-col">
                  <span className="font-bold">Question {i + 1}</span>
                  <span className="text-muted-foreground">
                    massa mi. Aliquam in hendrerit urna...
                  </span>
                </Link>
              </div>
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        <Separator />
        <p className="text-2xl">
          <span className="font-bold">Time left:</span>
          <span>15:32</span>
        </p>
        <Separator />
        <Button className="w-full">
          <LogOut />
          Finish Attempt
        </Button>
      </div>
    </div>
  );
};

export default QuizSidebar;
