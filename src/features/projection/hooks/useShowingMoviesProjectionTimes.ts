import { useQuery } from "@tanstack/react-query";
import { getShowingMoviesProjectionTimes } from "../api/projectionQueries.ts";
import type { FilterShowingMovieProjectionTimes } from "../types/requestTypes.ts";

export default function useShowingMoviesProjectionTimes(
  filters: FilterShowingMovieProjectionTimes,
) {
  return useQuery<string[], Error>({
    queryKey: ["showing-movies-projection-times", filters],

    queryFn: () => getShowingMoviesProjectionTimes(filters),
  });
}
