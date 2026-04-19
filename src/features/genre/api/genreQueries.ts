import type { NameIdPair } from "../../../common/types/responseTypes.ts";
import { genresApi } from "../../../common/api/baseApi.ts";

export async function getGenresNameIdPairs(): Promise<NameIdPair[]> {
  const response = await genresApi.get("/names");
  return response.data;
}
