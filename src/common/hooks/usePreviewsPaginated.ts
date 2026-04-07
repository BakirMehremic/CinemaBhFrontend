import { useQuery } from "@tanstack/react-query";
import type {
  CardItem,
  SliderType,
} from "../components/CardSlider/types/cardSliderTypes.ts";
import type { PaginatedResponse } from "../types/paginationTypes.ts";
import getMoviePreviewsPaginated from "../../features/movie/api/movieQueries.ts";
import { getVenuePreviewsPaginated } from "../../features/venue/api/venueQueries.ts";

export default function usePaginatedData(
  type: SliderType,
  pageNumber?: number,
  pageSize?: number,
) {
  return useQuery<PaginatedResponse<CardItem>, Error>({
    queryKey: [type, pageNumber, pageSize],

    queryFn: async () => {
      switch (type) {
        case "showingMovies":
          return getMoviePreviewsPaginated({
            pageNumber,
            pageSize,
            status: "SHOWING",
          });
        case "upcomingMovies":
          return getMoviePreviewsPaginated({
            pageNumber,
            pageSize,
            status: "UPCOMING",
          });

        case "venues":
          return getVenuePreviewsPaginated({
            pageNumber,
            pageSize,
          });

        default:
          throw new Error(`Invalid slider type ${type}`);
      }
    },
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });
}
