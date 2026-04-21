import styles from "./VenueDetails.module.css";
import { useParams } from "react-router-dom";
import useVenueDetailsById from "../../features/venue/hooks/useVenueDetails.ts";
import { Building, MapPin, Phone } from "lucide-react";
import useVenueShowingMovies from "../../features/movie/hooks/useVenueShowingMovies.ts";
import { useState } from "react";
import type { CardItem } from "../../common/components/CardSlider/types/cardSliderTypes.ts";
import Card from "../../common/components/Card/Card.tsx";
import NoData from "../../common/components/NoData/NoData.tsx";

export default function VenueDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useVenueDetailsById(Number(id));
  const [pageSize, setPageSize] = useState(4);
  const { data: moviesData } = useVenueShowingMovies({
    pageNumber: 0,
    pageSize: pageSize,
    venueId: Number(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="error-message">An error occurred</div>;
  if (!data || !moviesData) return <div className="error-message">No data</div>;

  const handleLoadMore = () => {
    setPageSize((prev) => prev + 4);
  };

  const hasMoreData =
    moviesData.page_size * (moviesData.page_number + 1) <
    moviesData.total_elements;
  const isEmpty = moviesData.total_elements === 0;
  const resultCount = moviesData.total_elements;

  return (
    <>
      <div className={styles.marginContainer}>
        <div className={styles.title}>Venue Details</div>

        <div className={styles.card}>
          <img src={data.image_url} alt={data.name} className={styles.image} />

          <div className={styles.content}>
            <div className={styles.textBlock}>
              <h3 className={styles.cardTitle}>{data.name}</h3>
              <p className={styles.line}>
                <MapPin className={styles.icon} />
                {data.city_name} {data.street} {data.street_number}
              </p>
              <p className={styles.line}>
                <Phone className={styles.icon} /> +{data.phone}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.title}>
          Movies playing in {data.name} ({resultCount}):
        </div>

        <div className={styles.moviesContainer}>
          {moviesData.content.map((item: CardItem) => (
            <div key={item.id}>
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.loadMoreContainer}>
        {isEmpty ? (
          <NoData
            title="No Movies found"
            description={`We are working on adding movies to ${data.name}.`}
            Icon={Building}
            width="85vw"
          />
        ) : hasMoreData ? (
          <div className={styles.loadMore} onClick={handleLoadMore}>
            Load More
          </div>
        ) : null}
      </div>
    </>
  );
}
