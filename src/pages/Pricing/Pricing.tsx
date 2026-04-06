import styles from "./Pricing.module.css";
import PricingCard from "./components/PricingCard.tsx";

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
        <PricingCard
          title="Regular seats"
          price={7}
          features={[
            "Comfortable seating",
            "Affordable Pricing",
            "Wide Selection",
            "Accessible locations",
            "Suitable for everyone",
          ]}
          isBig={false}
        />
        <PricingCard
          title="Love Seats"
          price={24}
          features={[
            "Side-by-side design",
            "Comfortable padding",
            "Adjustable armrests",
            "Cup holders",
            "Reserved for couples",
          ]}
          isBig={true}
        />
        <PricingCard
          title="VIP Seats"
          price={10}
          features={[
            "Enhanced comfort",
            "Priority seating",
            "Prime viewing",
            "Personal space",
            "Luxury extras",
          ]}
          isBig={false}
        />
      </div>
    </>
  );
}
