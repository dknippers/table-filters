import type { VNode } from "vue";

export type Column<T> = {
  header: string;
  value?: (item: T) => string | number | boolean;
  render?: (item: T) => VNode;
};
