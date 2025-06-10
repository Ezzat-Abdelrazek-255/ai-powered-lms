import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-[300px] rounded-md border border-white/20 bg-transparent p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

export default SearchInput;
