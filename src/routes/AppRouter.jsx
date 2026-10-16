import { Routes, Route } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import LocationDetailPage from "../pages/LocationDetailPage";
import MapPage from "../pages/MapPage";
import FavoritesPage from "../pages/FavoritesPage";
import AboutUsPage from "../pages/AboutUsPage";
import AuthPage from "../pages/AuthPage";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      <Route path="/location/:id" element={<LocationDetailPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage register />} />
    </Routes>
  );
}
