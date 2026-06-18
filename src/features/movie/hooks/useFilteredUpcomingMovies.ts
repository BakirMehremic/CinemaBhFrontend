import type { FilterUpcomingMoviesParams } from "../types/requestTypes.ts";
import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MovieUpcomingResponse } from "../types/responseTypes.ts";
import { getFilteredMoviesPaginated } from "../api/filterMovies.ts";
import { normalizeQueryKey } from "../../../common/util/queryUtils.ts";
import { keepPlaceholderDataForPagination } from "../../../common/util/paginationUtils.ts";

export function useFilteredUpcomingMoviesPaginated(
  params: FilterUpcomingMoviesParams,
) {
  return useQuery<PaginatedResponse<MovieUpcomingResponse>, Error>({
    queryKey: ["filtered-upcoming-movies", normalizeQueryKey(params)],
    queryFn: () =>
      getFilteredMoviesPaginated<MovieUpcomingResponse>("/upcoming", params),
    placeholderData: keepPlaceholderDataForPagination(params),
  });
}
