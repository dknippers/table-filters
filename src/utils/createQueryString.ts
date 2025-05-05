export function createQueryString<T extends Record<string, string | number | (string | number)[] | undefined>>(
  filters: T
): string {
  const params = new URLSearchParams();

  for (const key in filters) {
    const value = filters[key];
    if (value == null) continue;
    if (typeof value === 'string' && value.length === 0) continue;

    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, String(v)));
    } else {
      params.append(key, String(value));
    }
  }

  return params.toString();
}
