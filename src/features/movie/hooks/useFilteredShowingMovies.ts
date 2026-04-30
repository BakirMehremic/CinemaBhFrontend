import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MovieShowingResponse } from "../types/responseTypes.ts";
import getFilteredMoviesPaginated from "../api/filterMovies.ts";
import type { FilterShowingMoviesParams } from "../types/requestTypes.ts";
import normalizeQueryKey from "../../../common/util/queryUtils.ts";
import { keepPlaceholderDataForPagination } from "../../../common/util/paginationUtils.ts";

export default function useFilteredShowingMoviesPaginated(
  params: FilterShowingMoviesParams,
) {
  return useQuery<PaginatedResponse<MovieShowingResponse>, Error>({
    queryKey: ["filtered-showing-movies", normalizeQueryKey(params)],
    queryFn: () =>
      getFilteredMoviesPaginated<MovieShowingResponse>("/showing", params),
    placeholderData: keepPlaceholderDataForPagination(params),
  });
}
