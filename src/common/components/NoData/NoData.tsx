import { Film } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NoData.module.css";
import type { NoDataProps } from "./types/NoDataProps.ts";

export default function NoData({
  title = "No movies to preview for current date",
  description = `We are working on updating our schedule for upcoming movies. 
Stay tuned for amazing movie experience or explore our other exciting cinema features in the meantime!`,
  linkText = "Explore Upcoming Movies",
  linkTo = "/upcoming",
  Icon = Film,
  width = "86vw",
}: NoDataProps) {
  return (
    <div className={styles.card} style={{ width }}>
      <Icon className={styles.filmIcon}></Icon>

      <div className={styles.noMoviesText}>{title}</div>

      <div className={styles.secondaryText}>{description}</div>

      <Link to={linkTo} className={styles.exploreText}>
        {linkText}
      </Link>
    </div>
  );
}
