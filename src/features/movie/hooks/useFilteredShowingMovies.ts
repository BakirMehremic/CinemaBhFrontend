import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MovieShowingResponse } from "../types/responseTypes.ts";
import getFilteredShowingMoviesPaginated from "../api/filterMovies.ts";
import type { FilterShowingMoviesParams } from "../types/requestTypes.ts";

export default function useFilteredShowingMoviesPaginated(
  params: FilterShowingMoviesParams,
) {
  return useQuery<PaginatedResponse<MovieShowingResponse>, Error>({
    queryKey: ["filtered-showing-movies", params],
    queryFn: () => getFilteredShowingMoviesPaginated(params),
    placeholderData: (prev) => prev,
  });
}
