import styles from "./CardSliderHeader.module.css";
import type { CardSliderHeaderProps } from "../CardSlider/types/cardSliderTypes.ts";
import { Link } from "react-router-dom";

export default function CardSliderHeader({
  title,
  seeAllLink,
}: CardSliderHeaderProps) {
  return (
    <>
      <h2 className={styles.sliderTitle}>{title}</h2>
      <Link to={seeAllLink} className={styles.sliderAction}>
        See All
      </Link>
    </>
  );
}
