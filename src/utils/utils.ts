export function sortFn<T>(items: T[], valueFn: (item: T) => any, asc: boolean): T[] {
  return [...items].sort((a, b) => {
    const valueA = valueFn(a);
    const valueB = valueFn(b);

    if (valueA === valueB) return 0;
    if (valueA > valueB) return asc ? 1 : -1;
    return asc ? -1 : 1;
  });
}
