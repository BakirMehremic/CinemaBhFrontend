import type { PageNumberPageSizeOptional } from "../../../common/types/requestTypes.ts";

export type ShowingStatus = "SHOWING" | "UPCOMING";

export type GetMoviesPreviewsQueryParams = PageNumberPageSizeOptional & {
  status?: ShowingStatus;
};

export type FilterShowingMoviesParams = {
  projectionDate: string;
  projectionTime?: string;
  name?: string;
  cityId?: number;
  venueId?: number;
  genreId?: number;
  pageSize: number;
  pageNumber: number;
};

export type MovieByVenueIdRequest = {
  pageNumber: number;
  pageSize: number;
  venueId: number;
};
