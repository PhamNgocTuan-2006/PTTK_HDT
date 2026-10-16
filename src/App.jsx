import Header from "./components/layout/HeaderNavbar";
import Footer from "./components/layout/Footer";
import StickyPlayer from "./components/layout/StickyBottomPlayer";
import AppRouter from "./routes/AppRouter";
export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <AppRouter />
      </div>
      <Footer />
      <StickyPlayer />
    </div>
  );
}
