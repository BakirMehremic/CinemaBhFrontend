import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = false;
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="CinemaBh" className={styles.logoImage} />
      </Link>

      <div className={styles.links}>
        <Link to="/showing">Currently Showing</Link>
        {/*        <Link to="/">Upcoming Movies</Link>*/}
        <Link to="/venues">Venues</Link>
      </div>
      <div className={styles.signInWrapper}>
        {isLoggedIn && <button className={styles.signIn}>Sign In</button>}
      </div>
    </nav>
  );
}
