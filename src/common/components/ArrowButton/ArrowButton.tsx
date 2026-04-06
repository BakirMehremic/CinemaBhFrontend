import type { ArrowButtonProps } from "./types/arrowButtonProps.ts";
import styles from "./ArrowButton.module.css";

export default function ArrowButton({
  direction,
  isActive,
  onClick,
}: ArrowButtonProps) {
  const isLeft = direction == "left";

  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={styles.arrowButton}
    >
      <svg
        className={isActive ? styles.strokeActive : styles.strokeInactive}
        viewBox="0 0 24 24"
      >
        {isLeft ? (
          <>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </>
        ) : (
          <>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </>
        )}
      </svg>
    </button>
  );
}
