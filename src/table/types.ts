import type { VNode } from 'vue';

export type SortState<T = string> = {
  column: T;
  asc: boolean;
};

export type Column<T, TSortColumn = string> = {
  header: string;
  sortColumn?: TSortColumn;
  value?: (item: T) => string | number | boolean;
  render?: (item: T) => VNode;
};
