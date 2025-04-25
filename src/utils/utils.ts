export function sortFn<T>(items: T[], valueFn: (item: T) => any, asc: boolean): T[] {
  return [...items].sort((a, b) => {
    const valueA = valueFn(a);
    const valueB = valueFn(b);

    if (valueA === valueB) return 0;
    if (valueA > valueB) return asc ? 1 : -1;
    return asc ? -1 : 1;
  });
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delayInMs: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delayInMs);
  };
}
