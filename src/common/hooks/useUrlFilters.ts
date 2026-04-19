import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

type FilterValue = string | number | boolean | undefined;
type FilterParams = Record<string, FilterValue>;

export default function useUrlFilters<T extends FilterParams>(
  defaultFilters: T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const result = { ...defaultFilters };

    for (const key of Object.keys(defaultFilters)) {
      const paramValue = searchParams.get(key);

      if (paramValue !== null) {
        const defaultValue = defaultFilters[key];

        if (typeof defaultValue === "number") {
          result[key as keyof T] = Number(paramValue) as T[keyof T];
        } else if (typeof defaultValue === "boolean") {
          result[key as keyof T] = (paramValue === "true") as T[keyof T];
        } else {
          result[key as keyof T] = paramValue as T[keyof T];
        }
      }
    }

    return result;
  }, [searchParams, defaultFilters]);

  const setFilters = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const newFilters =
        typeof updater === "function" ? updater(filters) : updater;
      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(newFilters)) {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      }

      setSearchParams(params, { replace: false });
    },
    [filters, setSearchParams],
  );

  return [filters, setFilters];
}
