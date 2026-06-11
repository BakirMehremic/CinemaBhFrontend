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
import DateRangePicker from "../../features/movie/components/DateRangePicker/DateRangePicker.tsx";
import type { DateRangeStrings } from "../../features/movie/components/DateRangePicker/types/dateRangePickerTypes.ts";
import LoadMoreButton from "../../common/components/LoadMoreButton/LoadMoreButton.tsx";
import LoadingSpinner from "../../common/components/LoadingSpinner/LoadingSpinner.tsx";

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
  } = useFilteredUpcomingMoviesPaginated(filters);

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

  const handleDateRangeApply = (range: DateRangeStrings) => {
    setFilters((prev) => ({
      ...prev,
      startShowingDateFrom: range.from,
      startShowingDateTo: range.to,
      pageNumber: 0,
    }));
  };

  const resultCount = moviesData?.total_elements ?? 0;
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
          <DateRangePicker onApply={handleDateRangeApply} />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="error-message">An error occurred</div>
        ) : hasMovies ? (
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
      {hasMovies && moviesData.has_next && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
    </>
  );
}
