import styles from "./Hero.module.css";
import heroImage from "../../assets/avatar-image.jpg"

export default function Hero() {
    return (
        <div className={styles.hero}>
            <img src={heroImage} alt="Cinema" className={styles.image}/>
        </div>
    );
}