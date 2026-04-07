import styles from "./CardSliderPagination.module.css";
import ArrowButton from "../ArrowButton/ArrowButton.tsx";
import type { PaginationProps } from "./types/paginationProps.ts";

export default function CardSliderPagination({
  totalPages,
  totalElements,
  elementCount,
  pageNumber,
  pageSize,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  const hasNextPage = pageNumber + 1 < totalPages;
  const hasPrevPage = pageNumber > 0;
  const shownElements = pageNumber * pageSize + elementCount;

  return (
    <div className={styles.paginationContainer}>
      <p>
        Showing <span className={styles.elementNumber}>{shownElements}</span> of{" "}
        <span className={styles.elementNumber}>{totalElements}</span>
      </p>
      <ArrowButton
        direction="left"
        isActive={hasPrevPage}
        onClick={onPrevPage}
      />

      <ArrowButton
        direction="right"
        isActive={hasNextPage}
        onClick={onNextPage}
      />
    </div>
  );
}
