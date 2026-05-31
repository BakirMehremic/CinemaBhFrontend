import type {
  FilterShowingMoviesParams,
  FilterUpcomingMoviesParams,
} from "../types/requestTypes.ts";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type {
  MovieShowingResponse,
  MovieUpcomingResponse,
} from "../types/responseTypes.ts";
import { moviesApi } from "../../../common/api/baseApi.ts";

export async function getFilteredMoviesPaginated<
  T extends MovieShowingResponse | MovieUpcomingResponse,
>(
  endpoint: "/showing" | "/upcoming",
  params: FilterShowingMoviesParams | FilterUpcomingMoviesParams,
): Promise<PaginatedResponse<T>> {
  const response = await moviesApi.get<PaginatedResponse<T>>(endpoint, {
    params,
  });
  return response.data;
}
