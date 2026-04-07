import styles from "./Hero.module.css";
import { useEffect, useState } from "react";
import useHeroSectionMovies from "../../../features/movie/hooks/useHeroSectionMovies.ts";
import placeholderImage from "../../../assets/avatar-image.jpg";

export default function Hero() {
  const { data, isLoading, isError, error } = useHeroSectionMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!data || data.length < 2) return;
    let timeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      timeout = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev === data.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });

        setIsTransitioning(false);
      }, 700);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || error)
    return <div className="error-message">Error loading movies</div>;
  if (!data || data.length < 1)
    return <div className="error-message">No movies available</div>;

  const movie = data[currentIndex];

  return (
    <div className={styles.imageContainer}>
      <img
        className={`${styles.image} ${isTransitioning ? styles.fadeActive : ""}`}
        src={
          movie.cover_photo_url != null
            ? movie.cover_photo_url
            : placeholderImage
        }
        alt={movie.name}
      />

      <div
        className={`${styles.overlayContent} ${
          isTransitioning ? styles.fadeActive : styles.fade
        }`}
      >
        <div>
          {movie.genres[0] ? (
            <div className={styles.genreContainer}>
              <span>{movie?.genres[0]}</span>
            </div>
          ) : null}
        </div>

        <div className={styles.textContent}>
          <h1>{movie.name}</h1>
          <h6>{movie.synopsis}</h6>
          <button className={styles.buyTicketButton}>Buy Ticket</button>
        </div>
      </div>

      <div className={styles.bottomRects}>
        {data.map((movie, index) => (
          <div
            key={movie.id}
            className={
              index === currentIndex ? styles.rectActive : styles.rectInactive
            }
          />
        ))}
      </div>
    </div>
  );
}
