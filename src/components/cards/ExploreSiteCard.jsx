import { Heart, MapPin, Play, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useHeritage } from "../../core/context/HeritageContext";
import { getCategoryTextClass } from "../../core/utils/categoryStyles";
import { useAudio } from "../../core/context/AudioPlayerContext";
export default function SiteCard({ site }) {
  const { language, favorites, toggleFavorite } = useHeritage();
  const { play } = useAudio();
  return (
    <article className="group rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition">
      <Link to={"/location/" + site.id}>
        <div className="relative h-52 overflow-hidden">
          <img
            src={site.image}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          <span
            className={`absolute top-3 left-3 bg-white/95 rounded-full px-3 py-1 text-xs font-semibold ${getCategoryTextClass(site.category)}`}
          >
            {site.category}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <Link to={"/location/" + site.id}>
          <h3 className="font-bold">{site.name[language] || site.name.en}</h3>
        </Link>
        <p className="text-xs text-gray-500 mt-2 flex gap-1">
          <MapPin size={13} />
          {site.district} · {site.year}
        </p>
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {site.description[language] || site.description.en}
        </p>
        <div className="border-t mt-4 pt-3 flex justify-between items-center text-xs text-gray-500">
          <button
            onClick={() => play(site)}
            className="flex items-center gap-1 hover:text-black"
          >
            <Play size={14} fill="currentColor" />
            Audio guide · {site.duration} min
          </button>
          <button
            onClick={() => toggleFavorite(site.id)}
            className={favorites.includes(site.id) ? "text-red-500" : ""}
          >
            <Heart
              size={17}
              fill={favorites.includes(site.id) ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
