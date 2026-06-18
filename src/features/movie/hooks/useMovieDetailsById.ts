import { useQuery } from "@tanstack/react-query";
import { getMovieDetailsById } from "../api/movieQueries.ts";
import type { MovieDetailsResponse } from "../types/responseTypes.ts";

export function useMovieDetailsById(movieId: number) {
  return useQuery<MovieDetailsResponse, Error>({
    queryKey: ["movie-details", movieId],

    queryFn: () => getMovieDetailsById(movieId),
    enabled: !Number.isNaN(movieId) && movieId > 0,
  });
}
