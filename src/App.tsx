import Navbar from "./common/components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./common/components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import Pricing from "./pages/Pricing/Pricing";
import CurrentlyShowing from "./pages/CurrentlyShowing/CurrentlyShowing.tsx";
import Venues from "./pages/Venues/Venues.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/showing" element={<CurrentlyShowing />} />
        <Route path="/venues" element={<Venues />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
