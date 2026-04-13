import styles from "./CurrentlyShowing.module.css";
import NameSearchBox from "../../common/components/NameSearchBox/NameSearchBox.tsx";
import NameIdDropdown from "../../common/components/NameIdDropdown/NameIdDropdown.tsx";
import type { NameIdPair } from "../../common/types/responseTypes.ts";
import DatePicker from "../../features/movie/components/DatePicker/DatePicker.tsx";
import ShowingMovieCard from "../../features/movie/components/ShowingMovieCard/ShowingMovieCard.tsx";
import useFilteredShowingMoviesPaginated from "../../features/movie/hooks/useFilteredShowingMovies.ts";
import useCityNameIdPairs from "../../features/city/hooks/useCityNameIdPairs.ts";
import useVenueNameIdPairs from "../../features/venue/hooks/useVenueNameIdPairs.ts";
import useGenreNameIdPairs from "../../features/genre/hooks/useGenreNameIdPairs.ts";
import useUrlFilters from "../../common/hooks/useUrlFilters.ts";
import type { FilterShowingMoviesParams } from "../../features/movie/types/requestTypes.ts";
import { Building, CalendarClock, MapPin, Video } from "lucide-react";
import { PROJECTION_TIMES } from "../../features/movie/constants/projectionTimes.ts";
import NoData from "../../common/components/NoData/NoData.tsx";

export default function CurrentlyShowing() {
  const [filters, setFilters] = useUrlFilters<FilterShowingMoviesParams>({
    cityId: undefined,
    venueId: undefined,
    genreId: undefined,
    projectionTime: undefined,
    name: undefined,
    projectionDate: new Date().toLocaleDateString("en-CA"),
    pageNumber: 0,
    pageSize: 2,
  });

  const {
    data: moviesData,
    isLoading,
    isError,
  } = useFilteredShowingMoviesPaginated({
    cityId: filters.cityId,
    venueId: filters.venueId,
    genreId: filters.genreId,
    projectionTime: filters.projectionTime,
    name: filters.name,
    projectionDate: filters.projectionDate,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  const { data: cityData } = useCityNameIdPairs();
  const { data: venueData } = useVenueNameIdPairs();
  const { data: genreData } = useGenreNameIdPairs();

  const handleNameIdSelect =
    (key: "cityId" | "venueId" | "genreId") => (option: NameIdPair) => {
      setFilters((prev) => ({
        ...prev,
        [key]: option ? option.id : undefined,
      }));
    };

  const handleNameSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      name: query,
      pageNumber: 0,
    }));
  };

  const handleLoadMore = () => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
    }));
  };

  const handleSelectDate = (date: string) => {
    setFilters((prev) => ({
      ...prev,
      projectionDate: date,
      pageNumber: 0,
    }));
  };

  // TODO find a better way to do this
  const handleSelectProjectionTime = (option: NameIdPair) => {
    const selectedTime = PROJECTION_TIMES.find((t) => t.id === option?.id);
    setFilters((prev) => ({
      ...prev,
      projectionTime: selectedTime?.timeValue,
      pageNumber: 0,
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
      <div className={styles.marginContainer}>
        <h2 className={styles.currentlyShowingTitle}>
          Currently Showing ({resultCount})
        </h2>

        <NameSearchBox
          onSearch={handleNameSearch}
          initialValue={filters.name || ""}
        />
        <div className={styles.filtersContainer}>
          <NameIdDropdown
            Icon={MapPin}
            options={cityData ? cityData : []}
            onSelect={handleNameIdSelect("cityId")}
            placeholder="All Cities"
          />
          <NameIdDropdown
            Icon={Building}
            options={venueData ? venueData : []}
            onSelect={handleNameIdSelect("venueId")}
            placeholder="All Cinemas"
          />
          <NameIdDropdown
            Icon={Video}
            options={genreData ? genreData : []}
            onSelect={handleNameIdSelect("genreId")}
            placeholder="All Genres"
          />
          <NameIdDropdown
            Icon={CalendarClock}
            options={PROJECTION_TIMES}
            onSelect={handleSelectProjectionTime}
            placeholder="All Projection Times"
          />
        </div>
        <div className={styles.datePickerContainer}>
          <DatePicker onSelect={handleSelectDate}></DatePicker>
        </div>

        <div className={styles.reminderText}>
          Quick reminder that our cinema schedule is on a ten-day update cycle.
        </div>

        {hasMovies ? (
          moviesData.content.map((movie) => (
            <ShowingMovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <NoData></NoData>
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
