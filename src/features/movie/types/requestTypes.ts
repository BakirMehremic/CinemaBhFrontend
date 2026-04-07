import type { PageNumberPageSizeOptional } from "../../../common/types/requestTypes.ts";

export type ShowingStatus = "SHOWING" | "UPCOMING";

export type GetMoviesPreviewsQueryParams = PageNumberPageSizeOptional & {
  status?: ShowingStatus;
};
