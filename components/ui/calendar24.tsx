"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar24({ text = " Select Date" }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {/* <Label
          htmlFor="date"
          className="px-1 text-xl font-semibold text-gray-light "
        >
          Date
        </Label> */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="h-18 w-auto justify-between border-gray-light bg-beige font-normal text-gray-light"
            >
              {date ? date.toLocaleDateString() : text}
              <ChevronDownIcon className="ml-2 h-5 w-5 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        {/* <Label
          htmlFor="time"
          className="px-1 text-xl font-semibold text-gray-light"
        >
          Time
        </Label> */}
        <Input
          type="time"
          id="time"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none border border-gray-light bg-beige text-gray-light [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
