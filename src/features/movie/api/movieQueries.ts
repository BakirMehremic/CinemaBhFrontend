import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import { moviesApi } from "../../../common/api/baseApi.ts";
import type { GetMoviesPreviewsQueryParams } from "../types/requestTypes.ts";

export default async function getMoviePreviewsPaginated(
  params?: GetMoviesPreviewsQueryParams,
): Promise<PaginatedResponse<MoviePreviewResponse>> {
  const response = await moviesApi.get("/preview", {
    params: {
      showingStatus: params?.status ? params.status : "SHOWING",
      pageNumber: params?.pageNumber ? params?.pageNumber : 0,
      pageSize: params?.pageSize ? params?.pageSize : 3,
    },
  });
  return response.data;
}
