import type { FilterShowingMoviesParams } from "../types/requestTypes.ts";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MovieShowingResponse } from "../types/responseTypes.ts";
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
