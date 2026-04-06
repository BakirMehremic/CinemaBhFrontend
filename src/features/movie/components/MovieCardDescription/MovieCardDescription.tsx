import type { MoviePreviewResponse } from "../../types/responseTypes.ts";
import styles from "./MovieCardDescription.module.css";

export default function MovieCardDescription({
  movie,
}: {
  movie: MoviePreviewResponse;
}) {
  const genre = movie?.genres?.[0];

  return (
    <p className={styles.movieGenre}>
      {movie.duration} MIN
      {genre ? (
        <>
          <span className={styles.divider}></span>
          {genre}
        </>
      ) : null}
    </p>
  );
}
