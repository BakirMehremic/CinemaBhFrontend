import { useQuery } from "@tanstack/react-query";
import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import { getHeroSectionMovies } from "../api/movieQueries.ts";

export default function useHeroSectionMovies() {
  return useQuery<MoviePreviewResponse[], Error>({
    queryKey: ["hero-section-movies"],
    queryFn: () => getHeroSectionMovies(),
  });
}
