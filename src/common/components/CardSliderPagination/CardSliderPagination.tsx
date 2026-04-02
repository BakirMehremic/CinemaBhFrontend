import styles from "./CardSliderPagination.module.css";
import type { PaginationProps } from "../../types/paginationTypes.ts";
import { ArrowButton } from "../ArrowButton/ArrowButton.tsx";

export default function CardSliderPagination({
  currentPage,
  totalPages,
  totalElements,
  elementCount,
  pageNumber,
  pageSize,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  const hasNextPage = currentPage + 1 < totalPages;
  const hasPrevPage = currentPage > 0;
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
