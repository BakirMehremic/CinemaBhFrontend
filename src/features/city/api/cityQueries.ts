import type { NameIdPair } from "../../../common/types/responseTypes.ts";
import { citiesApi } from "../../../common/api/baseApi.ts";

export async function getCityNameIdPairs(): Promise<NameIdPair[]> {
  const response = await citiesApi.get<NameIdPair[]>("/names");
  return response.data;
}
