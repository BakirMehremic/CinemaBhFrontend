export type MoviePreviewResponse = {
  name: string;
  id: number;
  duration: number;
  cover_photo_url?: string;
  synopsis: string;
  genres: string[];
};

export type MovieShowingResponse = {
  id: number;
  name: string;
  cover_photo_url: string;
  pg_rating: string;
  language: string;
  duration: number;
  genres: string[];
  projection_times: string[];
  last_projection_date: string;
};

export type MovieUpcomingResponse = {
  id: number;
  name: string;
  cover_photo_url: string;
  duration: number;
  opens_date: string;
  genres: string[];
};
