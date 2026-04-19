import type { PaginatedResponse } from "../../../common/types/paginationTypes.ts";
import type {
  VenueBasicInfoResponse,
  VenueDetailsResponse,
  VenuePreviewResponse,
} from "../types/responseTypes.ts";
import type { PageNumberPageSizeOptional } from "../../../common/types/requestTypes.ts";
import { venuesApi } from "../../../common/api/baseApi.ts";
import type { NameIdPair } from "../../../common/types/responseTypes.ts";
import type { VenueBasicInfoRequest } from "../types/requestTypes.ts";

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

export async function getVenueNameIdPairs(
  cityId?: number,
): Promise<NameIdPair[]> {
  const response = await venuesApi.get("/names", {
    params: {
      cityId: cityId ?? undefined,
    },
  });
  return response.data;
}

export async function getVenueDetailsById(
  venueId: number,
): Promise<VenueDetailsResponse> {
  const response = await venuesApi.get(`/details/${venueId}`);
  return response.data;
}

export async function getFilteredVenueBasicDetailsPaginated(
  params: VenueBasicInfoRequest,
): Promise<PaginatedResponse<VenueBasicInfoResponse>> {
  const response = await venuesApi.get("/basic", {
    params: {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      cityId: params?.cityId,
      name: params?.name,
    },
  });
  return response.data;
}
