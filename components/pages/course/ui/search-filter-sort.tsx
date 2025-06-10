"use client";
import React, { useMemo, useState } from "react";
import { FilterOption } from "@/types/filter-sort-options";
import { SortOption } from "@/types/filter-sort-options";
import SearchInput from "@/components/ui/search-input";
import Filterdropdown from "@/components/ui/filter-dropdown";
import SortDropdown from "@/components/ui/sort-dropdown";

type SearchFilterSortProps<T> = {
  items: T[];
  searchKeys: (keyof T)[];
  renderItem: (item: T) => React.ReactNode;
  filters?: FilterOption<T>[];
  sortOptions?: SortOption<T>[];
  className?: string;
};

function SearchFilterSort<T>({
  items,
  searchKeys,
  renderItem,
  filters = [],
  sortOptions = [],
  className = "",
}: SearchFilterSortProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (activeFilter !== "all") {
      const filter = filters.find((f) => f.value === activeFilter);
      if (filter) result = result.filter(filter.predicate);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) => {
        searchKeys.some((key) => {
          const value = item[key];
          return (
            typeof value === "string" && value.toLowerCase().includes(query)
          );
        });
      });
    }

    if (sortBy) {
      const sorter = sortOptions.find((s) => s.value === sortBy);
      if (sorter) result.sort(sorter.compareFn);
    }

    return result;
  }, [
    items,
    searchQuery,
    activeFilter,
    sortBy,
    filters,
    searchKeys,
    sortOptions,
  ]);

  return (
    <div className={`space-y-[2.4rem] ${className}`}>
      <div className="flex flex-wrap items-center gap-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        {filters.length > 0 && (
          <Filterdropdown
            options={filters}
            value={activeFilter}
            onChange={setActiveFilter}
          />
        )}
        {sortOptions.length > 0 && (
          <SortDropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        )}
      </div>
      <ul className="grid grid-cols-3 gap-[1.6rem]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))
        ) : (
          <p className="col-span-3 text-center text-white/80">
            No results found.
          </p>
        )}
      </ul>
    </div>
  );
}

export default SearchFilterSort;
