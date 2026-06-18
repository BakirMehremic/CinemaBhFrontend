import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type {
  MovieDetailsResponse,
  MoviePreviewResponse,
} from "../types/responseTypes.ts";
import { moviesApi } from "../../../common/api/baseApi.ts";
import type {
  GetMoviesPreviewsQueryParams,
  MovieByVenueIdRequest,
} from "../types/requestTypes.ts";

export async function getMoviePreviewsPaginated(
  params?: GetMoviesPreviewsQueryParams,
): Promise<PaginatedResponse<MoviePreviewResponse>> {
  const response = await moviesApi.get<PaginatedResponse<MoviePreviewResponse>>(
    "/preview",
    {
      params: {
        showingStatus: params?.status ?? "SHOWING",
        pageNumber: params?.pageNumber ?? 0,
        pageSize: params?.pageSize ?? 3,
      },
    },
  );
  return response.data;
}

export async function getMoviePreviewsPaginatedByVenueId(
  params: MovieByVenueIdRequest,
): Promise<PaginatedResponse<MoviePreviewResponse>> {
  const response = await moviesApi.get<PaginatedResponse<MoviePreviewResponse>>(
    "/showing/venue",
    {
      params,
    },
  );
  return response.data;
}

export async function getMovieDetailsById(
  movieId: number,
): Promise<MovieDetailsResponse> {
  const response = await moviesApi.get<MovieDetailsResponse>(`/${movieId}`);
  return response.data;
}
