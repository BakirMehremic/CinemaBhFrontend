import styles from "./ShowingMovieCard.module.css";
import type { MovieShowingResponse } from "../../types/responseTypes.ts";
import { useState } from "react";

export default function ShowingMovieCard({
  movie,
}: {
  movie: MovieShowingResponse;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.card}>
      <img src={movie.cover_photo_url} alt={movie.name} />
      <div className={styles.descriptionContainer}>
        <div className={styles.movieTitle}>{movie.name}</div>
        <div className={styles.movieDetailsText}>
          <span>{movie.pg_rating}</span>
          <span className={styles.divider}>|</span>
          <span>{movie.language}</span>
          <span className={styles.divider}>|</span>
          <span>{movie.duration}</span>
        </div>
        <div className={styles.genresContainer}>
          {movie.genres.map((g) => (
            <span key={g} className={styles.genreBadge}>
              {g}
            </span>
          ))}
        </div>
        <div className={styles.playingUntil}>
          Playing until: {movie.last_projection_date}
        </div>
      </div>
      <div className={styles.showtimesSection}>
        <span className={styles.showtimesTitle}>Showtimes</span>

        <div className={styles.showtimesGrid}>
          {movie.projection_times.map((p, index) => (
            <span
              key={index}
              className={
                index === activeIndex
                  ? styles.showtimeBadgeActive
                  : styles.showtimeBadge
              }
              onClick={() => setActiveIndex(index)}
            >
              {p.substring(0, 5)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
