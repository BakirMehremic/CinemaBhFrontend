import Hero from "./Hero/Hero.tsx";
import VenueNamesSlider from "./VenueNamesSlider/VenueNamesSlider.tsx";
import CardSlider from "../../common/components/CardSlider/CardSlider.tsx";

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      <VenueNamesSlider></VenueNamesSlider>
      <CardSlider
        title="Currently Showing"
        seeAllLink="/showing"
        type="showingMovies"
      ></CardSlider>
      <CardSlider
        title="Upcoming Movies"
        seeAllLink="/showing"
        type="upcomingMovies"
      ></CardSlider>
      <CardSlider
        title="Venues"
        seeAllLink="/venues"
        type="venues"
      ></CardSlider>
    </>
  );
}
