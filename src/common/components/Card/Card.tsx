import type { CardItem } from "../../types/cardSliderTypes.ts";
import { isMoviePreviewResponse } from "../../util/typeChecks.ts";
import styles from "./Card.module.css";
import MovieCardDescription from "../../../features/movie/components/MovieCardDescription/MovieCardDescription.tsx";
import placeholderImage from "../../../assets/placeholder-image.png";

export default function Card({ item }: { item: CardItem }) {
  if (isMoviePreviewResponse(item)) {
    return (
      <div className={styles.card}>
        <img
          src={item.cover_photo_url ? item.cover_photo_url : placeholderImage}
          alt={item.name}
          className={styles.image}
        />
        <h3 className={styles.title}>{item.name}</h3>
        <MovieCardDescription movie={item} />
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <img
          src={item.image_url ? item.image_url : placeholderImage}
          alt={item.name}
          className={styles.image}
        />
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.venueSubtitle}>
          {item.street} {item.street_number} {item.city_name}
        </p>
      </div>
    );
  }
}
