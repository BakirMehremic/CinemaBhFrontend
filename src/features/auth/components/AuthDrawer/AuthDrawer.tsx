import { useContext } from "react";
import styles from "./AuthDrawer.module.css";
import { AuthContext } from "../../context/authContext.ts";

// TODO rewrite ai code
export default function AuthDrawer() {
  const context = useContext(AuthContext);

  if (!context) return null;

  const { isAuthDrawerOpen, closeAuthDrawer } = context;

  return (
    <>
      {/* 1. BACKDROP */}
      <div
        className={`${styles.backdrop} ${isAuthDrawerOpen ? styles.backdropVisible : ""}`}
        onClick={closeAuthDrawer}
      />

      {/* 2. DRAWER */}
      <div
        className={`${styles.drawer} ${isAuthDrawerOpen ? styles.drawerOpen : ""}`}
      >
        <div className={styles.header}>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <button onClick={closeAuthDrawer} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" className={styles.input} />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }}>Sign Up</span>
        </div>
      </div>
    </>
  );
}
