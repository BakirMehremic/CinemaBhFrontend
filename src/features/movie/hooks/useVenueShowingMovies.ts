import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import { getMoviePreviewsPaginatedByVenueId } from "../api/movieQueries.ts";
import type { MovieByVenueIdRequest } from "../types/requestTypes.ts";

export default function useVenueShowingMovies(params: MovieByVenueIdRequest) {
  const query = useQuery<PaginatedResponse<MoviePreviewResponse>, Error>({
    queryKey: ["movie-venue", params],
    queryFn: () => getMoviePreviewsPaginatedByVenueId(params),

    placeholderData: (prev) => prev,
  });
  return query;
}
