import { useQuery } from "@tanstack/react-query";
import type { CardItem, SliderType } from "../types/cardSliderTypes.ts";
import type { PaginatedResponse } from "../types/paginationTypes.ts";
import { getMoviePreviewsPaginated } from "../../features/movie/api/movieQueries.ts";
import { getVenuePreviewsPaginated } from "../../features/venue/api/venueQueries.ts";

export function usePaginatedData(
  type: SliderType,
  pageNumber?: number,
  pageSize?: number,
) {
  return useQuery<PaginatedResponse<CardItem>, Error>({
    queryKey: [type, pageNumber, pageSize],

    queryFn: async () => {
      switch (type) {
        case "showingMovies":
          return (await getMoviePreviewsPaginated({
            pageNumber,
            pageSize,
            status: "SHOWING",
          })) as PaginatedResponse<CardItem>;

        case "upcomingMovies":
          return (await getMoviePreviewsPaginated({
            pageNumber,
            pageSize,
            status: "UPCOMING",
          })) as PaginatedResponse<CardItem>;

        case "venues":
          return (await getVenuePreviewsPaginated({
            pageNumber,
            pageSize,
          })) as PaginatedResponse<CardItem>;
      }
    },
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}
