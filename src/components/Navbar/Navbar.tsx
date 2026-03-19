import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>Cinema</div>

            <div className={styles.middle}>
                <a href="#">Currently Showing</a>
                <a href="#">Upcoming Movies</a>
                <a href="#">Venues</a>
            </div>

            <div className={styles.right}>
                <button className={styles.signIn}>Sign In</button>
            </div>
        </nav>
    );
}