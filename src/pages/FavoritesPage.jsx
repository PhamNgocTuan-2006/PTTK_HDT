import { useState } from "react";
import { Heart, MapPin, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { sites, t } from "../core/data/hanoiHeritageSites";
import { useHeritage } from "../core/context/HeritageContext";
import { useAudio } from "../core/context/AudioPlayerContext";

function FavoriteSiteCard({ site }) {
  const { language, toggleFavorite } = useHeritage();
  const { play } = useAudio();
  const title = site.name[language] || site.name.en;

  return (
    <article className="group relative flex h-full min-h-[280px] flex-col overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/location/${site.id}`}
        className="relative block h-40 shrink-0 overflow-visible rounded-t-2xl"
      >
        <img
          src={site.image}
          alt={title}
          className="h-full w-full rounded-t-2xl object-cover transition group-hover:scale-[1.02]"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-800 shadow-sm">
          {site.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 pt-6">
        <Link to={`/location/${site.id}`}>
          <h3 className="line-clamp-1 font-bold text-slate-900">{title}</h3>
        </Link>
        <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={13} />
          {site.district} · {site.year}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => play(site)}
            className="flex items-center gap-2 text-xs font-medium text-slate-600 transition hover:text-slate-950"
          >
            <PlayCircle
              size={16}
              fill="currentColor"
              className="text-slate-900"
            />
            Audio guide: {site.duration} min
          </button>
          <button
            type="button"
            aria-label="Remove from favorites"
            onClick={() => toggleFavorite(site.id)}
            className="text-red-500 transition hover:scale-105"
          >
            <Heart size={17} fill="currentColor" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FavoritesPage() {
  const { favorites, listened, language } = useHeritage();
  const [sort, setSort] = useState("recent");
  const saved = sites.filter((site) => favorites.includes(site.id));
  const ordered = [...saved].sort((a, b) =>
    sort === "az"
      ? a.name.en.localeCompare(b.name.en)
      : favorites.indexOf(a.id) - favorites.indexOf(b.id),
  );

  return (
    <main className="container site-main pb-32 pt-12">
      <section className="member-banner flex flex-wrap items-center justify-between gap-8 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-white bg-slate-100 text-2xl shadow-sm">
            ◉
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">User</h1>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Explorer Member
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500">
              <Heart size={19} fill="currentColor" />
            </span>
            <div>
              <small className="block text-[10px] font-bold uppercase tracking-wide text-red-500">
                Saved Sites
              </small>
              <b className="text-2xl text-red-600">
                {saved.length}{" "}
                <span className="text-xs font-medium text-red-400">places</span>
              </b>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800">
              <PlayCircle size={19} />
            </span>
            <div>
              <small className="block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Audio Listened
              </small>
              <b className="text-2xl text-slate-900">
                {listened}{" "}
                <span className="text-xs font-medium text-slate-500">
                  guides
                </span>
              </b>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-xl font-extrabold">
              {t[language]?.saved || "Saved Audio Guides"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Places you have favorited will appear here.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSort("recent")}
              className={
                sort === "recent"
                  ? "rounded-full bg-black px-4 py-2 text-xs text-white"
                  : "rounded-full bg-slate-100 px-4 py-2 text-xs"
              }
            >
              Recently Added
            </button>
            <button
              onClick={() => setSort("az")}
              className={
                sort === "az"
                  ? "rounded-full bg-black px-4 py-2 text-xs text-white"
                  : "rounded-full bg-slate-100 px-4 py-2 text-xs"
              }
            >
              A-Z
            </button>
          </div>
        </div>
        {ordered.length ? (
          <div className="favorites-grid grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {ordered.map((site) => (
              <FavoriteSiteCard key={site.id} site={site} />
            ))}
            {Array.from({ length: Math.max(0, 4 - ordered.length) }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  className="min-h-[280px] rounded-2xl border border-slate-100 bg-white/50"
                />
              ),
            )}
          </div>
        ) : (
          <div className="pt-10 text-center">
            <p className="text-sm text-slate-500">No saved audio guides yet.</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-full bg-black px-5 py-2 text-xs font-semibold text-white"
            >
              Explore sites
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
