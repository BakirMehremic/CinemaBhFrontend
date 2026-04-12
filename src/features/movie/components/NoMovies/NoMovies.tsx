import styles from "./NoMovies.module.css";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoMovies() {
  return (
    <div className={styles.card}>
      <Film className={styles.filmIcon}></Film>
      <div className={styles.noMoviesText}>
        No movies to preview for current date
      </div>
      <div className={styles.secondaryText}>
        We are working on updating our schedule for upcoming movies. Stay tuned
        for amazing movie experience or explore our other exciting cinema
        features in the meantime!
      </div>

      <Link to="/upcoming" className={styles.exploreText}>
        Explore Upcoming Movies
      </Link>
    </div>
  );
}
