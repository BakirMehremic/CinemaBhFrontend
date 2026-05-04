import styles from "./LoadingSpinner.module.css";

export type LoadingSpinnerProps = {
  width?: string;
  height?: string;
};

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
