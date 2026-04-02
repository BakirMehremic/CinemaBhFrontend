import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <>
      <div className={styles.textSection}>
        <div className={styles.heading}>Pricing</div>
        <div className={styles.paragraphBox}>
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone’s preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </div>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.smallCard}>
          <p className={styles.cardTitle}>Regular seats</p>
          <p className={styles.smallCardPrice}>7 KM</p>
          <p className={styles.perTicket}>*per ticket</p>
          <div className={styles.bulletPointsContainer}>
            <p className={styles.bulletPoint}>Comfortable seating</p>
            <p className={styles.bulletPoint}>Affordable Pricing</p>
            <p className={styles.bulletPoint}>Wide Selection</p>
            <p className={styles.bulletPoint}>Accessible locations</p>
            <p className={styles.bulletPoint}>Suitable for everyone</p>
          </div>
          <button className={styles.smallCardButton}>
            <p className={styles.smallCardButtonText}>Explore Movies</p>
          </button>
        </div>
        <div className={styles.bigCard}>
          <p className={styles.cardTitle}>Love Seats</p>
          <p className={styles.bigCardPrice}>24 KM</p>
          <p className={styles.perTicket}>*per ticket</p>
          <div className={styles.bulletPointsContainer}>
            <p className={styles.bulletPoint}>Side-by-side design</p>
            <p className={styles.bulletPoint}>Comfortable padding</p>
            <p className={styles.bulletPoint}>Adjustable armrests</p>
            <p className={styles.bulletPoint}>Cup holders</p>
            <p className={styles.bulletPoint}>Reserved for couples</p>
          </div>
          <button className={styles.bigCardButton}>
            <p className={styles.bigCardButtonText}>Explore Movies</p>
          </button>
        </div>
        <div className={styles.smallCard}>
          <p className={styles.cardTitle}>VIP Seats</p>
          <p className={styles.smallCardPrice}>10 KM</p>
          <p className={styles.perTicket}>*per ticket</p>
          <div className={styles.bulletPointsContainer}>
            <p className={styles.bulletPoint}>Enhanced comfort</p>
            <p className={styles.bulletPoint}>Priority seating</p>
            <p className={styles.bulletPoint}>Prime viewing</p>
            <p className={styles.bulletPoint}>Personal space</p>
            <p className={styles.bulletPoint}>Luxury extras</p>
          </div>
          <button className={styles.smallCardButton}>
            <p className={styles.smallCardButtonText}>Explore Movies</p>
          </button>
        </div>
      </div>
    </>
  );
}
