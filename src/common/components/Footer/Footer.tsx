import styles from "./Footer.module.css";
import logo from "../../../assets/logo-white.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="Logo" className={styles.logo} />

      <div className={styles.links}>
        <Link to="/about">ABOUT US</Link>

        <span className={styles.divider}></span>

        <Link to="/pricing">TICKETS</Link>
      </div>

      <p>
        Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
      </p>
    </footer>
  );
}
