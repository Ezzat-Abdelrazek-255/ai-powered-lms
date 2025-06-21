"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Label from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/utils";

type DateInputProps = {
  label: string;
  placeholder: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export function DateInput({
  label,
  placeholder,
  value,
  onChange,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className="space-y-[0.4rem]">
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "h-auto w-full justify-between p-[1rem] px-[1.2rem] text-[1.2rem] font-normal text-black/60",
              value && "text-black",
            )}
          >
            {value ? value.toLocaleDateString() : placeholder}
            <ChevronDownIcon className="h-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[999] w-auto overflow-hidden p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              onChange?.(selectedDate);
              setOpen(false);
            }}
          />
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
