import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type { VenuePreviewResponse } from "../types/responseTypes.ts";
import type { PageNumberPageSizeOptional } from "../../../common/types/requestTypes.ts";
import { venuesApi } from "../../../common/api/baseApi.ts";
import type { NameIdPair } from "../../../common/types/responseTypes.ts";

export async function getVenuePreviewsPaginated(
  params?: PageNumberPageSizeOptional,
): Promise<PaginatedResponse<VenuePreviewResponse>> {
  const response = await venuesApi.get("/preview", {
    params: {
      pageNumber: params?.pageNumber,
      pageSize: params?.pageSize,
    },
  });
  return response.data;
}

export async function getVenueNameIdPairs(): Promise<NameIdPair[]> {
  const response = await venuesApi.get("/names");
  return response.data;
}
