import { useQuery } from "@tanstack/react-query";
import { getVenueDetailsById } from "../api/venueQueries.ts";
import type { VenueDetailsResponse } from "../types/responseTypes.ts";

export default function useVenueDetailsById(venueId: number) {
  return useQuery<VenueDetailsResponse, Error>({
    queryKey: ["venue-details", venueId],

    queryFn: () => getVenueDetailsById(venueId),
    staleTime: 1000 * 60 * 30,
  });
}
