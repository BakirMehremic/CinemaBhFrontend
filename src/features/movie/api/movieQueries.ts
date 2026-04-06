import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import { moviesApi } from "../../../common/api/baseApi.ts";
import type { GetMoviesPreviewsQueryParams } from "../types/requestTypes.ts";

export async function getMoviePreviewsPaginated(
  params?: GetMoviesPreviewsQueryParams,
): Promise<PaginatedResponse<MoviePreviewResponse>> {
  const response = await moviesApi.get("/preview", {
    params: {
      showingStatus: params?.status,
      pageNumber: params?.pageNumber,
      pageSize: params?.pageSize,
    },
  });
  return response.data;
}
export async function getHeroSectionMovies(): Promise<MoviePreviewResponse[]> {
  const response = await moviesApi.get("/preview", {
    params: {
      showingStatus: "SHOWING",
      pageNumber: 0,
      pageSize: 3,
    },
  });
  return response.data.content;
}
