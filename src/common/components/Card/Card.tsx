import {
  isMoviePreviewResponse,
  isMovieUpcomingResponse,
  isVenueBasicInfoResponse,
  isVenuePreviewResponse,
} from "../../../features/movie/util/movieUtil.ts";
import styles from "./Card.module.css";
import MovieCardDescription from "../../../features/movie/components/MovieCardDescription/MovieCardDescription.tsx";
import placeholderImage from "../../../assets/placeholder-image.png";
import type { CardProps } from "./types/CardProps.ts";
import { Link } from "react-router-dom";

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
  } else if (isVenueBasicInfoResponse(item)) {
    return (
      <Link to={`/venues/${item.id}`} className={styles.link}>
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
      </Link>
    );
  } else if (isMovieUpcomingResponse(item)) {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const now = new Date();

      const diffDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

      const isWithin7Days = diffDays <= 7 && diffDays >= 0;

      if (isWithin7Days) {
        return date.toLocaleDateString("en-US", { weekday: "long" });
      }

      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return (
      <div className={styles.card}>
        <div className={styles.ribbon}>{formatDate(item.opens_date)}</div>
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
    throw new Error(`Invalid card item ${item}`);
  }
}
