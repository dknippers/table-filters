import type { Component } from "vue";

type BaseColumn = {
  name: string;
};

type ValueColumn<T> = BaseColumn & {
  value: (item: T) => string;
  render?: never;
};

type RenderColumn<T> = BaseColumn & {
  value?: never;
  render: (item: T) => { component: Component; props: Record<string, any> };
};

export type Column<T> = ValueColumn<T> | RenderColumn<T>;
