import styles from "./VenueNamesSlider.module.css";
import { useVenueNameIdPairs } from "../../../features/venue/hooks/useVenueNameIdPairs.ts";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner.tsx";

export default function VenueNamesSlider() {
  const { data, isLoading, isError } = useVenueNameIdPairs();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="error-message">An error occurred</div>;
  if (!data || data.length < 1)
    return <div className="error-message">No data</div>;

  const repeatedData = Array(3).fill(data).flat();

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContent}>
        {repeatedData.map((venue, index) => (
          <span key={index} className={styles.sliderItem}>
            {venue.name}
          </span>
        ))}
      </div>
    </div>
  );
}
