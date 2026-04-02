import { useQuery } from "@tanstack/react-query";
import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import { getHeroSectionMovies } from "../api/movieQueries.ts";

export function useHeroSectionMovies() {
  return useQuery<MoviePreviewResponse[], Error>({
    queryKey: ["hero-section-movies"],
    queryFn: async () => getHeroSectionMovies(),
  });
}
