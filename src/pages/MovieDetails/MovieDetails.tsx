import { useParams } from "react-router-dom";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner.tsx";
import { useMovieDetailsById } from "../../features/movie/hooks/useMovieDetailsById.ts";
import styles from "./MovieDetails.module.css";
import { Star } from "lucide-react";
import { getYouTubeEmbedUrl } from "../../features/movie/util/youtubeEmbedUrlUtil.ts";

export default function MovieDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useMovieDetailsById(Number(id));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="error-message">An error occurred</div>;
  if (!data) return <div className="error-message">No data</div>;

  const embedUrl = getYouTubeEmbedUrl(data.trailer_link);

  const MAX_IMAGES_DISPLAYED = 4;
  const imagesToDisplay = data.images?.slice(0, MAX_IMAGES_DISPLAYED) || [];

  const FALLBACK_IMAGE_URL = "../../assets/placeholder-image.png"

  return (
    <div className={styles.marginContainer}>
      <h1 className={styles.title}>Movie Details</h1>
      <div className={styles.mediaContainer}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Movie Trailer"
            className={styles.trailer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={data.images[0] || FALLBACK_IMAGE_URL }
            alt={`Trailer unavailable`}
            className={styles.trailer}
          />
        )}

        <div className={styles.imageGrid}>
          {imagesToDisplay.map((url) => (
            <img
              key={url}
              src={url}
              className={styles.movieImage}
              alt={`Image for movie ${data.name}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.description}>
        {data.pg_rating}
        <div className={styles.divider}>|</div>
        {data.language}
        <div className={styles.divider}>|</div>
        {data.duration_minutes} MIN
        <div className={styles.divider}>|</div>
        Projection date: {data.start_showing_date} - {data.end_showing_date}
      </div>
      <div className={styles.genresContainer}>
        {data.genres.map((g) => (
          <span key={g} className={styles.genreBadge}>
            {g}
          </span>
        ))}
      </div>
      <div className={styles.description}>{data.synopsis}</div>
      <div className={styles.cast}>
        Director: <span className={styles.castBold}>{data.directors.join(", ")}</span>
      </div>
      <div className={styles.cast}>
        Writers: <span className={styles.castBold}>{data.writers.join(", ")}</span>
      </div>
      <div className={styles.subtitle}>
        <div className={styles.dividerBold}>|</div>
        Cast
      </div>
      <div className={styles.castGrid}>
        {data.actors.map((c) => (
          <span key={c} className={styles.castMemberName}>
            {c}
          </span>
        ))}
      </div>
      <div className={styles.subtitle}>
        <div className={styles.dividerBold}>|</div>
        Rating
      </div>

      <div className={styles.ratingBadge}>
        <span>IMDB</span>
        <span>{data.imdb_rating}</span>
        <Star size={14} className={styles.star} />
      </div>
      <div className={styles.ratingBadge}>
        <span>Rotten Tomatoes</span>
        <span>{data.rotten_tomatoes_rating}</span>
        <Star size={14} className={styles.star} />
      </div>
    </div>
  );
}
