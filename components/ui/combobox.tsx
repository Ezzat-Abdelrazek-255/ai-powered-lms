import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Choice } from "@/types/courses";

export interface ComboBoxOption {
  value: string;
  label: string;
  choices: Choice[];
}

export interface ComboBoxProps {
  /** Array of selectable options */
  options: ComboBoxOption[];
  /** Currently selected value */
  value: string;
  /** Handler when selection changes */
  onChange: (value: string) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Width of the button/popover (e.g. "200px" or "w-full") */
  width?: string;
}

const listNumerals = ["a", "b", "c", "d"];

export const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = React.useMemo(
    () => options.find((opt) => opt.value === value)?.label,
    [options, value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            `w-full justify-between overflow-hidden px-[1.6rem] text-left font-sans normal-case leading-normal`,
          )}
        >
          <div className="truncate whitespace-nowrap">
            {value && selectedLabel ? selectedLabel : placeholder}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-[40rem] rounded-xs border-0 p-0`)}>
        <Command className="rounded-xs border border-black/40 bg-beige-light p-[0.8rem]">
          <CommandInput
            className="rounded-none py-[1.4rem] text-left text-[1.4rem] placeholder:text-[1.4rem]"
            placeholder={`Search`}
          />
          <CommandList>
            <CommandEmpty className="text-center text-[1.4rem]">
              No results found.
            </CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  className="flex cursor-pointer flex-col items-start gap-[0.4rem] rounded-xs bg-none px-[1.6rem] py-[0.8rem] pb-[1rem] text-left text-[1.6rem] leading-normal transition-colors hover:bg-beige"
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <span>{opt.label}</span>
                    <CheckIcon
                      className={cn(
                        "mr-2 size-6",
                        value === opt.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </div>
                  <div className="relative flex flex-wrap items-center gap-[0.8rem] overflow-ellipsis text-[1.2rem] text-black/60">
                    <span>Choices: </span>
                    {opt.choices.map((choice, i) => (
                      <span
                        className="flex items-center gap-[0.4rem]"
                        key={choice.choiceId}
                      >
                        <span>{listNumerals[i]})</span>
                        <span>{choice.choice}</span>
                      </span>
                    ))}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Example usage:
// const frameworks = [
//   { value: "next.js", label: "Next.js" },
//   { value: "sveltekit", label: "SvelteKit" },
// ];
//
// export function App() {
//   const [framework, setFramework] = React.useState("");
//
//   return (
//     <ComboBox
//       options={frameworks}
//       value={framework}
//       onChange={setFramework}
//       placeholder="Select framework"
//       width="200px"
//     />
//   );
// }
