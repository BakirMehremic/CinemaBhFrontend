import useVenueNameIdPairs from "../../features/venue/hooks/useVenueNameIdPairs.ts";
import useCityNameIdPairs from "../../features/city/hooks/useCityNameIdPairs.ts";
import useGenreNameIdPairs from "../../features/genre/hooks/useGenreNameIdPairs.ts";
import useUrlFilters from "../../common/hooks/useUrlFilters.ts";
import type { FilterUpcomingMoviesParams } from "../../features/movie/types/requestTypes.ts";
import useFilteredUpcomingMoviesPaginated from "../../features/movie/hooks/useFilteredUpcomingMovies.ts";
import styles from "./Upcoming.module.css";
import NameSearchBox from "../../common/components/NameSearchBox/NameSearchBox.tsx";
import OptionsDropdown from "../../common/components/OptionsDropdown/OptionsDropdown.tsx";
import { Building, MapPin, Video } from "lucide-react";
import type { NameIdPair } from "../../common/types/responseTypes.ts";
import NoData from "../../common/components/NoData/NoData.tsx";
import Card from "../../common/components/Card/Card.tsx";

export default function Upcoming() {
  const [filters, setFilters] = useUrlFilters<FilterUpcomingMoviesParams>({
    startShowingDateFrom: undefined,
    startShowingDateTo: undefined,
    name: undefined,
    cityId: undefined,
    venueId: undefined,
    genreId: undefined,
    pageNumber: 0,
    pageSize: 8,
  });

  const {
    data: moviesData,
    isLoading,
    isError,
  } = useFilteredUpcomingMoviesPaginated({
    startShowingDateFrom: filters.startShowingDateFrom,
    startShowingDateTo: filters.startShowingDateTo,
    cityId: filters.cityId,
    venueId: filters.venueId,
    genreId: filters.genreId,
    name: filters.name,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  const { data: venueData = [] } = useVenueNameIdPairs(filters.cityId);
  const { data: cityData = [] } = useCityNameIdPairs();
  const { data: genreData = [] } = useGenreNameIdPairs();

  const handleNameSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      name: query,
      pageNumber: 0,
    }));
  };

  const handleNameIdSelect =
    (key: "cityId" | "venueId" | "genreId") => (option: NameIdPair | null) => {
      setFilters((prev) => ({
        ...prev,
        [key]: option?.id ?? undefined,
        pageNumber: 0,
      }));
    };

  const handleLoadMore = () => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="error-message">An error occurred</div>;
  if (!moviesData) return <div className="error-message">No data</div>;

  const resultCount = moviesData?.total_elements;
  const hasNextPage =
    moviesData.page_size * (moviesData?.page_number + 1) <
    moviesData?.total_elements;
  const hasMovies = moviesData && moviesData.content.length > 0;

  return (
    <>
      <div className={styles.marginLeftContainer}>
        <h2 className={styles.title}>Upcoming Movies ({resultCount})</h2>
        <NameSearchBox
          onSearch={handleNameSearch}
          initialValue={filters.name || ""}
          placeholder="Search Upcoming Movies"
        />
        <div className={styles.filtersContainer}>
          <OptionsDropdown
            Icon={MapPin}
            options={cityData}
            onSelect={handleNameIdSelect("cityId")}
            placeholder="All Cities"
            getId={(p) => p.id}
            getLabel={(p) => p.name}
          />
          <OptionsDropdown
            Icon={Building}
            options={venueData}
            onSelect={handleNameIdSelect("venueId")}
            placeholder="All Cinemas"
            getId={(p) => p.id}
            getLabel={(p) => p.name}
          />
          <OptionsDropdown
            Icon={Video}
            options={genreData}
            onSelect={handleNameIdSelect("genreId")}
            placeholder="All Genres"
            getId={(p) => p.id}
            getLabel={(p) => p.name}
          />
          <OptionsDropdown
            Icon={Video}
            options={genreData}
            onSelect={handleNameIdSelect("genreId")}
            placeholder="All Genres"
            getId={(p) => p.id}
            getLabel={(p) => p.name}
          />
        </div>
        {hasMovies ? (
          <div className={styles.cardsContainer}>
            {moviesData.content.map((movie) => (
              <Card item={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <NoData
            linkText="Explore Showing Movies"
            linkTo="/showing"
            title="No Upcoming Movies Found"
            description="We are
            working on updating our schedule for upcoming movies. Stay tuned for
            amazing movie experience or explore our other exciting cinema features
            in the meantime!"
          ></NoData>
        )}
      </div>
      {hasMovies && hasNextPage && (
        <div className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </div>
      )}
    </>
  );
}
