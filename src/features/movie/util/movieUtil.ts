import type {
  MoviePreviewResponse,
  MovieUpcomingResponse,
} from "../types/responseTypes.ts";
import type { CardItem } from "../../../common/components/CardSlider/types/cardSliderTypes.ts";
import type {
  VenueBasicInfoResponse,
  VenuePreviewResponse,
} from "../../venue/types/responseTypes.ts";

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

export const isVenueBasicInfoResponse = (
  item: CardItem,
): item is VenueBasicInfoResponse => {
  return (item as VenueBasicInfoResponse).image_url !== undefined;
};

export const isMovieUpcomingResponse = (
  item: CardItem,
): item is MovieUpcomingResponse => {
  return (item as MovieUpcomingResponse).opens_date !== undefined;
};
