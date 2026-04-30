import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { VenueBasicInfoRequest } from "../types/requestTypes.ts";
import type { VenueBasicInfoResponse } from "../types/responseTypes.ts";
import { getFilteredVenueBasicDetailsPaginated } from "../api/venueQueries.ts";
import normalizeQueryKey from "../../../common/util/queryUtils.ts";
import { keepPlaceholderDataForPagination } from "../../../common/util/paginationUtils.ts";

export default function useFilteredVenuesBasicInfoPaginated(
  params: VenueBasicInfoRequest,
) {
  return useQuery<PaginatedResponse<VenueBasicInfoResponse>, Error>({
    queryKey: ["filtered-basic-venues", normalizeQueryKey(params)],
    queryFn: () => getFilteredVenueBasicDetailsPaginated(params),
    placeholderData: keepPlaceholderDataForPagination(params),
  });
}
