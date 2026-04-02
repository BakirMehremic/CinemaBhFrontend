import styles from "./CardSliderHeader.module.css";
import type { CardSliderHeaderProps } from "../../types/cardSliderTypes.ts";

export default function CardSliderHeader({
  title,
  seeAllLink,
}: CardSliderHeaderProps) {
  return (
    <>
      <h2 className={styles.sliderTitle}>{title}</h2>
      <a href={seeAllLink} className={styles.sliderAction}>
        See All
      </a>
    </>
  );
}
