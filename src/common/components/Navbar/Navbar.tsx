import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../features/auth/context/authContext.ts";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar must be used within AuthProvider");
  }

  const { openAuthDrawer, currentUser } = authContext;

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="CinemaBh" className={styles.logoImage} />
      </Link>

      <div className={styles.links}>
        <Link to="/showing">Currently Showing</Link>
        <Link to="/upcoming">Upcoming Movies</Link>
        <Link to="/venues">Venues</Link>
      </div>
      <div className={styles.signInWrapper}>
        {!currentUser ? (
          <button className={styles.signIn} onClick={openAuthDrawer}>
            Sign In
          </button>
        ) : (
          <div>Welcome {currentUser.first_name}</div>
        )}
      </div>
    </nav>
  );
}
