import type { CardItem } from "../../CardSlider/types/cardSliderTypes.ts";

export type CardProps = {
  item: CardItem;
  style?: {
    cardWidth?: string;
    cardHeight?: string;
    imageWidth?: string;
    imageHeight?: string;
  };
};
