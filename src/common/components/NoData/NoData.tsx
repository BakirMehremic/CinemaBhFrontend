import { Film } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NoData.module.css";
import type { NoDataProps } from "./types/NoDataProps.ts";

export default function NoData({
  title,
  description,
  linkText,
  linkTo,
  Icon = Film,
  width = "86vw",
}: NoDataProps) {
  return (
    <div className={styles.card} style={{ width }}>
      <Icon className={styles.filmIcon}></Icon>

      <div className={styles.noMoviesText}>{title}</div>

      <div className={styles.secondaryText}>{description}</div>

      {linkText && linkTo && (
        <Link to={linkTo} className={styles.exploreText}>
          {linkText}
        </Link>
      )}
    </div>
  );
}
