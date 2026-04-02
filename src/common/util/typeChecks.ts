import type { MoviePreviewResponse } from "../../features/movie/types/responseTypes.ts";
import type { CardItem } from "../types/cardSliderTypes.ts";

export const isMoviePreviewResponse = (
  item: CardItem,
): item is MoviePreviewResponse => {
  return (item as MoviePreviewResponse).duration !== undefined;
};
