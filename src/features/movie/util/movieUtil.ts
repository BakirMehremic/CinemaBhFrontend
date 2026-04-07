import type { MoviePreviewResponse } from "../types/responseTypes.ts";
import type { CardItem } from "../../../common/components/CardSlider/types/cardSliderTypes.ts";

export const isMoviePreviewResponse = (
  item: CardItem,
): item is MoviePreviewResponse => {
  return (item as MoviePreviewResponse).duration !== undefined;
};
