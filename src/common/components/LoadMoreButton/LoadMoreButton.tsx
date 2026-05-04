import styles from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.loadMore} onClick={onClick}>
      Load More
    </button>
  );
}
