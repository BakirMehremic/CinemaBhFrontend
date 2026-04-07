import { useQuery } from "@tanstack/react-query";
import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import getMoviePreviewsPaginated from "../api/movieQueries.ts";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";

export default function useHeroSectionMovies() {
  const query = useQuery<PaginatedResponse<MoviePreviewResponse>, Error>({
    queryKey: ["hero-section-movies"],
    queryFn: () => getMoviePreviewsPaginated(),
  });
  return {
    ...query,
    data: query.data?.content,
  };
}
