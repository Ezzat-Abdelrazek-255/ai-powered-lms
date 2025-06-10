import React from "react";
import { SortOption } from "@/types/filter-sort-options";

type SortDropdownProps<T> = {
  options: SortOption<T>[];
  value: string | null;
  onChange: (value: string) => void;
};

const SortDropdown = <T,>({
  options,
  value,
  onChange,
}: SortDropdownProps<T>) => {
  return (
    <select
      name="sort"
      id="sort"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-white/20 bg-transparent p-3 text-white focus:outline-none"
    >
      <option value="">Sort By</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
