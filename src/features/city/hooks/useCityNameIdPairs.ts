import { useQuery } from "@tanstack/react-query";
import type { NameIdPair } from "../../../common/types/responseTypes.ts";
import { getCityNameIdPairs } from "../api/cityQueries.ts";

export default function useCityNameIdPairs() {
  return useQuery<NameIdPair[], Error>({
    queryKey: ["city-name-id-pairs"],

    queryFn: () => getCityNameIdPairs(),
  });
}
