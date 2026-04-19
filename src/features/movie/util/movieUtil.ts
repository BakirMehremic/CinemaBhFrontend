import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import type { CardItem } from "../../../common/components/CardSlider/types/cardSliderTypes.ts";
import type { VenuePreviewResponse } from "../../venue/types/responseTypes.ts";

export const isMoviePreviewResponse = (
  item: CardItem,
): item is MoviePreviewResponse => {
  return (item as MoviePreviewResponse).duration !== undefined;
};

export const isVenuePreviewResponse = (
  item: CardItem,
): item is VenuePreviewResponse => {
  return (item as VenuePreviewResponse).city_name !== undefined;
};
