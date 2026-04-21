import styles from "./CurrentlyShowing.module.css";
import NameSearchBox from "../../common/components/NameSearchBox/NameSearchBox.tsx";
import OptionsDropdown from "../../common/components/OptionsDropdown/OptionsDropdown.tsx";
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
import NoData from "../../common/components/NoData/NoData.tsx";
import useShowingMoviesProjectionTimes from "../../features/projection/hooks/useShowingMoviesProjectionTimes.ts";

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

  const { data: projectionTimesData = [] } = useShowingMoviesProjectionTimes({
    cityId: filters.cityId,
    venueId: filters.venueId,
    genreId: filters.genreId,
    movieName: filters.name,
    date: filters.projectionDate,
  });

  const { data: venueData = [] } = useVenueNameIdPairs(filters.cityId);
  const { data: cityData = [] } = useCityNameIdPairs();
  const { data: genreData = [] } = useGenreNameIdPairs();

  const handleNameIdSelect =
    (key: "cityId" | "venueId" | "genreId") => (option: NameIdPair | null) => {
      setFilters((prev) => ({
        ...prev,
        [key]: option?.id ?? undefined,
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

  const handleSelectProjectionTime = (option: string | null) => {
    setFilters((prev) => ({
      ...prev,
      projectionTime: option ?? undefined,
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
          placeholder="Search Movies"
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
            Icon={CalendarClock}
            options={projectionTimesData}
            onSelect={handleSelectProjectionTime}
            placeholder="All Projection Times"
            getId={(time) => time}
            getLabel={(time) => time}
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
          <NoData
            linkText="Explore Upcoming Movies"
            linkTo="/upcoming"
            title="No movies to preview for current date"
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
