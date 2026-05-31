import Navbar from "./common/components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./common/components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import Pricing from "./pages/Pricing/Pricing";
import CurrentlyShowing from "./pages/CurrentlyShowing/CurrentlyShowing.tsx";
import Venues from "./pages/Venues/Venues.tsx";
import VenueDetails from "./pages/VenueDetails/VenueDetails.tsx";
import Upcoming from "./pages/Upcoming/Upcoming.tsx";
import { AuthProvider } from "./features/auth/context/authProvider.tsx";
import AuthDrawer from "./features/auth/components/AuthDrawer/AuthDrawer.tsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AuthDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/showing" element={<CurrentlyShowing />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
