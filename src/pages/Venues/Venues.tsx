import styles from "./Venues.module.css";
import NameSearchBox from "../../common/components/NameSearchBox/NameSearchBox.tsx";
import { useUrlFilters } from "../../common/hooks/useUrlFilters.ts";
import type { VenueBasicInfoRequest } from "../../features/venue/types/requestTypes.ts";
import { useFilteredVenuesBasicInfoPaginated } from "../../features/venue/hooks/useVenuesBasicInfoPaginated.ts";
import OptionsDropdown from "../../common/components/OptionsDropdown/OptionsDropdown.tsx";
import { Building, MapPin } from "lucide-react";
import { useCityNameIdPairs } from "../../features/city/hooks/useCityNameIdPairs.ts";
import type { NameIdPair } from "../../common/types/responseTypes.ts";
import Card from "../../common/components/Card/Card.tsx";
import NoData from "../../common/components/NoData/NoData.tsx";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner.tsx";
import LoadMoreButton from "../../common/components/LoadMoreButton/LoadMoreButton.tsx";

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

  const { data: cityData = [] } = useCityNameIdPairs();

  const handleNameSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      name: query,
      pageNumber: 0,
    }));
  };

  const handleCitySelect = (option: NameIdPair | null) => {
    setFilters((prev) => ({
      ...prev,
      cityId: option?.id ?? undefined,
      pageNumber: 0,
      pageSize: 4,
    }));
  };
  const handleLoadMore = () => {
    setFilters((prev) => ({
      ...prev,
      pageSize: prev.pageSize + 4,
    }));
  };

  const isEmpty = data && data.total_elements === 0;
  const resultCount = data?.total_elements ?? 0;
  const cityName = cityData.find((c) => c.id === Number(filters.cityId))?.name;

  return (
    <>
      <div className={styles.marginContainer}>
        <div className={styles.venuesTitle}>Venues ({resultCount})</div>
        <div className={styles.searchContainer}>
          <NameSearchBox
            onSearch={handleNameSearch}
            width="69.3vw"
            placeholder="Search Venues"
          ></NameSearchBox>
          <OptionsDropdown
            options={cityData}
            onSelect={handleCitySelect}
            placeholder="All cities"
            Icon={MapPin}
            width="13.6vw"
            getId={(p) => p.id}
            getLabel={(p) => p.name}
          ></OptionsDropdown>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="error-message">An error occurred</div>
        ) : !isEmpty && data ? (
          <div className={styles.sliderContainer}>
            {data.content.map((venue) => (
              <Card
                key={venue.id}
                item={venue}
                style={{
                  cardWidth: "43vw",
                  cardHeight: "25.5vw",
                  imageWidth: "40.84vw",
                  imageHeight: "19.93vw",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.loadMoreContainer}>
        {isEmpty ? (
          <NoData
            title="No Venues found"
            description={`We are working on adding venues in ${cityName}.`}
            Icon={Building}
            width="85vw"
          />
        ) : data?.has_next ? (
          <LoadMoreButton onClick={handleLoadMore} />
        ) : null}
      </div>
    </>
  );
}
