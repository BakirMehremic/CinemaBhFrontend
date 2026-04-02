import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="CinemaBh" className={styles.logoImage} />
        </Link>
      </div>

      <div className={styles.links}>
        <Link to="/">
          <p>Currently Showing</p>
        </Link>
        <Link to="/">
          <p>Upcoming Movies</p>
        </Link>
        <Link to="/">
          <p>Venues</p>
        </Link>
      </div>

      <button className={styles.signIn}>Sign In</button>
    </nav>
  );
}
