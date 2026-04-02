import styles from "./CardSlider.module.css";
import CardSliderPagination from "../CardSliderPagination/CardSliderPagination.tsx";
import CardSliderHeader from "../CardSliderHeader/CardSliderHeader.tsx";
import type { CardItem, CardSliderProps } from "../../types/cardSliderTypes.ts";
import Card from "../Card/Card.tsx";
import { useState } from "react";
import { usePaginatedData } from "../../hooks/usePreviewsPaginated.ts";

export function CardSlider({ title, seeAllLink, type }: CardSliderProps) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 4;

  const { data, isLoading, isError } = usePaginatedData(
    type,
    pageNumber,
    pageSize,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="error-message">An error occurred</div>;
  if (!data || data.content.length < 1)
    return <div className="error-message">No data for {title}</div>;

  // on the backend page numbers start from 0
  const handleNextPage = () => {
    if (pageNumber + 1 < data.total_pages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 0) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderInner}>
        <div className={styles.sliderHeader}>
          <CardSliderHeader title={title} seeAllLink={seeAllLink} />
        </div>

        <div className={styles.sliderContainer}>
          {data.content.map((item: CardItem, index: number) => (
            <div key={item.id ? item.id : index}>
              <Card item={item} />
            </div>
          ))}
        </div>
        <CardSliderPagination
          currentPage={pageNumber}
          totalPages={data.total_pages}
          totalElements={data.total_elements}
          elementCount={data.content.length}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </section>
  );
}
