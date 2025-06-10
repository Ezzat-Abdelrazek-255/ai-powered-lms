import React from "react";
import { FilterOption } from "@/types/filter-sort-options";

type FilterDropdownProps<T> = {
  options: FilterOption<T>[];
  value: string;
  onChange: (value: string) => void;
};

const Filterdropdown = <T,>({
  options,
  value,
  onChange,
}: FilterDropdownProps<T>) => {
  return (
    <select
      name="filter"
      id="filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-white/20 bg-transparent p-3 text-white focus:outline-none"
    >
      <option value="all">All</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Filterdropdown;
