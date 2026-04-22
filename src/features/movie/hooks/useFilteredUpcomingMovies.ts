import type { FilterUpcomingMoviesParams } from "../types/requestTypes.ts";
import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MovieUpcomingResponse } from "../types/responseTypes.ts";
import { getFilteredUpcomingMoviesPaginated } from "../api/filterMovies.ts";

export default function useFilteredUpcomingMoviesPaginated(
  params: FilterUpcomingMoviesParams,
) {
  return useQuery<PaginatedResponse<MovieUpcomingResponse>, Error>({
    queryKey: ["filtered-upcoming-movies", params],
    queryFn: () => getFilteredUpcomingMoviesPaginated(params),
    placeholderData: (prev) => prev,
  });
}
