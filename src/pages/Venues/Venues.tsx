import styles from "./Venues.module.css";
import NameSearchBox from "../../common/components/NameSearchBox/NameSearchBox.tsx";
import useUrlFilters from "../../common/hooks/useUrlFilters.ts";
import type { VenueBasicInfoRequest } from "../../features/venue/types/requestTypes.ts";
import useFilteredVenuesBasicInfoPaginated from "../../features/venue/hooks/useVenuesBasicInfoPaginated.ts";

export default function Venues() {
  const [filters, setFilters] = useUrlFilters<VenueBasicInfoRequest>({
    cityId: undefined,
    name: undefined,
    pageNumber: 0,
    pageSize: 4,
  });

  const { data, isLoading, isError } = useFilteredVenuesBasicInfoPaginated({
    cityId: filters.cityId,
    name: filters.name,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  const handleNameSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      name: query,
      pageNumber: 0,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="error-message">An error occurred</div>;
  if (!data) return <div className="error-message">No data</div>;

  const resultCount = data.total_elements;

  return (
    <div className={styles.marginContainer}>
      <div className={styles.venuesTitle}>Venues ({resultCount})</div>
      <div className={styles.venuesContainer}>
        {data.content.map((venue) => (
          <div key={venue.id}>{venue.name}</div>
        ))}
      </div>
      <NameSearchBox onSearch={handleNameSearch}></NameSearchBox>
    </div>
  );
}
