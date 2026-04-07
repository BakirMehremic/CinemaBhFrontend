import type { VenuePreviewResponse } from "../../../../features/venue/types/responseTypes.ts";
import type { MoviePreviewResponse } from "../../../../features/movie/types/responseTypes.ts";

export type CardItem = VenuePreviewResponse | MoviePreviewResponse;
export type SliderType = "showingMovies" | "upcomingMovies" | "venues";

export type CardSliderHeaderProps = {
  title: string;
  seeAllLink: string;
};

export type CardSliderProps = CardSliderHeaderProps & {
  type: SliderType;
};
