import { projectionsApi } from "../../../common/api/baseApi.ts";
import type { FilterShowingMovieProjectionTimes } from "../types/requestTypes.ts";

export async function getShowingMoviesProjectionTimes(
  filters?: FilterShowingMovieProjectionTimes,
): Promise<string[]> {
  const response = await projectionsApi.get("/showing/times", {
    params: filters,
  });
  return response.data;
}
