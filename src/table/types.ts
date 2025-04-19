import type { Component, VNode } from "vue";

export type Column<T> = {
  header: string;
  value?: (item: T) => string;
  render?: (item: T) =>
    | {
        component: Component;
        props: Record<string, any>;
      }
    | VNode;
};
