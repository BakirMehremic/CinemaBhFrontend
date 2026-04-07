export type MoviePreviewResponse = {
  name: string;
  id: number;
  duration: number;
  cover_photo_url?: string;
  synopsis: string;
  genres: string[];
};
