import type { PlaceholderDataFunction } from "@tanstack/react-query";

type PaginationParams = {
  pageNumber?: number;
  pageSize?: number;
};

export const keepPlaceholderDataForPagination =
  <TData, TParams extends PaginationParams>(
    currentParams: TParams,
  ): PlaceholderDataFunction<TData> =>
  (prevData, prevQuery) => {
    const prevParams = prevQuery?.queryKey[1] as TParams | undefined;

    const isPaging =
      prevParams?.pageNumber !== currentParams.pageNumber ||
      prevParams?.pageSize !== currentParams.pageSize;

    return isPaging ? prevData : undefined;
  };
