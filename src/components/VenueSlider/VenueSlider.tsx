import styles from "./VenueSlider.module.css";

const venues = [
    "Cineplex",
    "Cinestar",
    "Cinema City",
    "Meeting Point",
    "Kinoteka",
    "Kino Novi Grad",
];

export default function VenueSlider() {
    return (
        <div className={styles.slider}>
            <div className={styles.sliderContent}>
                {venues.map((venue, index) => (
                    <span key={index} className={styles.sliderItem}>{venue}</span>
                ))}
                {venues.map((venue, index) => (
                    <span key={index + venues.length} className={styles.sliderItem}>{venue}</span>
                ))}
            </div>
        </div>
    );
}