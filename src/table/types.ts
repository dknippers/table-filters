import type { VNode } from 'vue';

export type SortOrder = 'asc' | 'desc';

export type Column<T, TSortBy = string> = {
  header: string;
  sortBy?: TSortBy;
  value?: (item: T) => string | number | boolean;
  render?: (item: T) => VNode;
};
