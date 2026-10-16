import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, LocateFixed, Route as RouteIcon } from "lucide-react";
import { sites } from "../core/data/hanoiHeritageSites";
import { useHeritage } from "../core/context/HeritageContext";
import { useAudio } from "../core/context/AudioPlayerContext";
import { getCategoryTextClass } from "../core/utils/categoryStyles";

const markerIcon = L.divIcon({
  className: "custom-marker",
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function Recenter({ site }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(site.coordinates, 14, { duration: 0.8 });
  }, [map, site]);
  return null;
}

export default function MapPage() {
  const [selected, setSelected] = useState(sites[0]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [route, setRoute] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const { language, favorites, toggleFavorite } = useHeritage();
  const { play } = useAudio();
  const categories = ["All", ...new Set(sites.map((site) => site.category))];
  const filtered = useMemo(
    () =>
      sites.filter((site) => {
        const haystack =
          `${Object.values(site.name).join(" ")} ${Object.values(site.description).join(" ")} ${site.district}`.toLowerCase();
        return (
          (category === "All" || site.category === category) &&
          haystack.includes(query.toLowerCase())
        );
      }),
    [category, query],
  );

  const locate = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsError("");
        setSelected({
          ...sites[0],
          id: "my-location",
          coordinates: [position.coords.latitude, position.coords.longitude],
          name: { en: "My location" },
          category: "Your location",
        });
      },
      () => setGpsError("Location permission was denied or unavailable."),
    );
  };

  return (
    <main className="map-page container py-8 site-main">
      <div className="map-layout grid lg:grid-cols-[320px_1fr] gap-4 h-[min(650px,calc(100vh-150px))] min-h-[500px]">
        <aside className="border border-gray-200/70 rounded-2xl p-4 overflow-hidden flex flex-col bg-white">
          <h1 className="text-lg font-extrabold">Explore Hanoi</h1>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-slate-300 bg-white transition-all focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10 mt-3">
            <Search size={14} className="text-gray-500 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search locations"
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-xs"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap mt-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={
                  category === item
                    ? "bg-black text-white rounded-full px-2.5 py-1 text-[11px]"
                    : "border border-gray-200 rounded-full px-2.5 py-1 text-[11px] hover:border-black"
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={locate}
              className="border border-gray-200 rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center hover:border-black"
            >
              <LocateFixed size={13} /> My location
            </button>
            <button
              onClick={() => setRoute((value) => !value)}
              className={
                route
                  ? "bg-black text-white rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center"
                  : "border border-gray-200 rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center"
              }
            >
              <RouteIcon size={13} /> Route
            </button>
          </div>
          {gpsError && (
            <p className="text-[11px] text-red-600 mt-2">{gpsError}</p>
          )}
          <div className="overflow-auto mt-3 space-y-2 pr-1">
            {filtered.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-10">
                No heritage sites match your search.
              </div>
            )}
            {filtered.map((site) => {
              const title = site.name[language] || site.name.en;
              return (
                <button
                  onClick={() => setSelected(site)}
                  key={site.id}
                  className="w-full text-left border border-gray-200/70 rounded-xl p-2.5 flex gap-2.5 hover:border-black transition"
                >
                  <img
                    src={site.image}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span className="flex-1 min-w-0">
                    <b className="text-xs block truncate">{title}</b>
                    <small className="text-gray-500 text-[11px]">
                      {site.district}
                    </small>
                    <em
                      className={`block text-[10px] uppercase not-italic mt-1 font-semibold ${getCategoryTextClass(site.category)}`}
                    >
                      {site.category}
                    </em>
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle favorite"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(site.id);
                    }}
                  >
                    <Heart
                      size={15}
                      className={
                        favorites.includes(site.id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }
                      fill={
                        favorites.includes(site.id) ? "currentColor" : "none"
                      }
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
        <section className="relative isolate z-0 overflow-hidden rounded-2xl border border-gray-300 bg-white">
          <MapContainer
            center={selected.coordinates}
            zoom={14}
            scrollWheelZoom={false}
            className="h-full min-h-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Recenter site={selected} />
            {sites.map((site) => (
              <Marker
                key={site.id}
                position={site.coordinates}
                icon={markerIcon}
              >
                <Popup>
                  <div className="w-48">
                    <img
                      src={site.image}
                      alt=""
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <strong className="text-sm block">
                      {site.name[language] || site.name.en}
                    </strong>
                    <small className="text-gray-500">
                      {site.duration} min audio guide
                    </small>
                    <Link
                      className="block mt-2 text-xs font-semibold underline"
                      to={`/location/${site.id}`}
                    >
                      Listen audio guide
                    </Link>
                    <button
                      onClick={() => play(site)}
                      className="mt-2 text-xs bg-black text-white rounded px-2 py-1"
                    >
                      Play now
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            {route && (
              <Polyline
                positions={sites.map((site) => site.coordinates)}
                pathOptions={{ color: "#111827", weight: 3, dashArray: "6 8" }}
              />
            )}
          </MapContainer>
          {route && (
            <div className="absolute left-3 bottom-3 z-[500] bg-white/90 rounded-lg px-3 py-2 text-[11px] shadow">
              Suggested route · visual connection
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
