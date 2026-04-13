import {
  isMoviePreviewResponse,
  isVenuePreviewResponse,
} from "../../../features/movie/util/movieUtil.ts";
import styles from "./Card.module.css";
import MovieCardDescription from "../../../features/movie/components/MovieCardDescription/MovieCardDescription.tsx";
import placeholderImage from "../../../assets/placeholder-image.png";
import type { CardProps } from "./types/CardProps.ts";

export default function Card({ item, style }: CardProps) {
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
  } else if (isVenuePreviewResponse(item)) {
    return (
      <div className={styles.card}>
        <img src={item.image_url} alt={item.name} className={styles.image} />
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.venueSubtitle}>
          {item.street} {item.street_number} {item.city_name}
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={styles.card}
        style={{
          width: style?.cardWidth,
          height: style?.cardHeight,
        }}
      >
        <img
          src={item.image_url}
          alt={item.name}
          className={styles.image}
          style={{
            width: style?.imageWidth,
            height: style?.imageHeight,
          }}
        />
        <h3 className={styles.title}>{item.name}</h3>
      </div>
    );
  }
}
