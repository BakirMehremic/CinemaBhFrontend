import styles from "./LoadingSpinner.module.css";
import type { LoadingSpinnerProps } from "./types/loadingSpinnerProps.ts";

export default function LoadingSpinner({
  width = "10vw",
  height = "10vw",
}: LoadingSpinnerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} style={{ width, height }}></div>
    </div>
  );
}
