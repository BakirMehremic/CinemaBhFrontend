import styles from "./AboutUs.module.css";
import seatsImage from "../../assets/seats.jpg";

export default function AboutUs() {
  return (
    <>
      <div className={styles.textContainer}>
        <p className={styles.textLine}>About Our Dream.</p>
        <p className={styles.textLine}>Our History.</p>
        <p className={styles.textLine}>Cinema.</p>
      </div>
      <div className={styles.aboutUs}>
        <h1>About Us</h1>
      </div>
      <div className={styles.aboutUsText}>
        <p>Welcome to Cinebh, where movie magic comes to life.</p>

        <p>
          At Cinebh, we're not just about screening films; we're passionate
          about creating unforgettable cinematic experiences.
        </p>

        <p>
          Since our establishment, we've been dedicated to providing our
          audience with top-quality entertainment in a comfortable and welcoming
          environment.
        </p>

        <p>
          Our state-of-the-art facilities boast the latest in audiovisual
          technology, ensuring that every movie is presented with stunning
          clarity and immersive sound. From the latest blockbusters to timeless
          classics, our diverse selection of films caters to every taste and
          preference.
        </p>

        <p>
          As a hub for community entertainment, we take pride in being more than
          just a cinema.
        </p>

        <br />
        <p>
          Join us at Cinebh and discover why we're not just your average movie
          theater—we're your destination for cinematic excellence and
          entertainment bliss.
        </p>
      </div>
      <div className={styles.seatsImage}>
        <img src={seatsImage} alt="Footer" className={styles.image} />
      </div>
    </>
  );
}
