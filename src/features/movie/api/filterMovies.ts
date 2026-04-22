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

export default async function getFilteredShowingMoviesPaginated(
  params: FilterShowingMoviesParams,
): Promise<PaginatedResponse<MovieShowingResponse>> {
  const response = await moviesApi.get("/showing", {
    params: {
      ...params,
    },
  });
  return response.data;
}

export async function getFilteredUpcomingMoviesPaginated(
  params: FilterUpcomingMoviesParams,
): Promise<PaginatedResponse<MovieUpcomingResponse>> {
  const response = await moviesApi.get("/upcoming", {
    params: {
      ...params,
    },
  });
  return response.data;
}
