import { useQuery } from "@tanstack/react-query";
import { getVenueNameIdPairs } from "../api/venueQueries.ts";
import type { NameIdPair } from "../../../common/types/responseTypes.ts";

export default function useVenueNameIdPairs() {
  return useQuery<NameIdPair[], Error>({
    queryKey: ["venue-name-id-pairs"],

    queryFn: () => getVenueNameIdPairs(),
    staleTime: 1000 * 60 * 30,
  });
}
