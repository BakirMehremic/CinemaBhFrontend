import { useQuery } from "@tanstack/react-query";
import type { NameIdPair } from "../../../common/types/responseTypes.ts";
import { getGenresNameIdPairs } from "../api/genreQueries.ts";

export default function useGenreNameIdPairs() {
  return useQuery<NameIdPair[], Error>({
    queryKey: ["genre-name-id-pairs"],

    queryFn: () => getGenresNameIdPairs(),
  });
}
