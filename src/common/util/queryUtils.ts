export default function normalizeQueryKey<T extends object>(rawParams: T): T {
  const sortedKeys = Object.keys(rawParams).sort() as Array<keyof T>;

  return sortedKeys.reduce((cleanParams, key) => {
    const value = rawParams[key];

    if (value !== undefined) {
      cleanParams[key] = value;
    }

    return cleanParams;
  }, {} as T);
}
