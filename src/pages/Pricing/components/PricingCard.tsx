import type { PricingCardProps } from "../types/pricinCardProps.ts";
import styles from "./PricingCard.module.css";

export default function PricingCard({
  title,
  price,
  features,
  isBig,
}: PricingCardProps) {
  return (
    <div className={isBig ? styles.bigCard : styles.smallCard}>
      <p className={styles.cardTitle}>{title}</p>
      <p className={isBig ? styles.bigCardPrice : styles.smallCardPrice}>
        {price} KM
      </p>
      <p className={styles.perTicket}>*per ticket</p>
      <div className={styles.bulletPointsContainer}>
        {features.map((feature, index) => (
          <p key={index} className={styles.bulletPoint}>
            {feature}
          </p>
        ))}
      </div>
      <button className={isBig ? styles.bigCardButton : styles.smallCardButton}>
        <p
          className={
            isBig ? styles.bigCardButtonText : styles.smallCardButtonText
          }
        >
          Explore Movies
        </p>
      </button>
    </div>
  );
}
