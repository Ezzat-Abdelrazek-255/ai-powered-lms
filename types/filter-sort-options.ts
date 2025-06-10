export type FilterOption<T> = {
  label: string;
  value: string;
  predicate: (item: T) => boolean;
};

export type SortOption<T> = {
  label: string;
  value: string;
  compareFn: (a: T, b: T) => number;
};
