import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Radio, Smartphone } from "lucide-react";

const stats = [
  ["1000+", "years of history"],
  ["6", "audio languages"],
  ["GPS", "real-time ready"],
  ["Web + Mobile", "open architecture"],
];

const features = [
  [
    "01",
    "GPS proximity auto-trigger",
    "Discover stories at the moment you arrive, with location-aware recommendations.",
  ],
  [
    "02",
    "AI multilingual pipeline",
    "Natural translations and speech help independent travelers explore without a guide.",
  ],
  [
    "03",
    "Smart route recommendation",
    "Walk an optimized route from the Old Quarter to Hoan Kiem and Thang Long.",
  ],
];

export default function AboutUsPage() {
  return (
    <main className="site-main">
      <section className="bg-gray-950 text-white py-20 md:py-28">
        <div className="container max-w-5xl">
          <p className="text-xs uppercase tracking-[.3em] text-gray-400">
            Our mission
          </p>
          <h1 className="max-w-4xl text-4xl md:text-6xl font-extrabold tracking-tight mt-5">
            Preserving Hanoi's millennial heritage through smart audio.
          </h1>
          <p className="text-gray-300 mt-6 max-w-2xl leading-7">
            A multilingual, location-aware guide that makes every walk through
            Hanoi more meaningful, accessible and memorable.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/"
              className="bg-white text-gray-950 rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              Explore sites <ArrowRight size={16} />
            </Link>
            <Link
              to="/map"
              className="border border-white/30 rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center gap-2 hover:bg-white/10"
            >
              <MapPin size={16} /> Open map
            </Link>
          </div>
        </div>
      </section>
      <section className="container py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-200 pb-12">
          {stats.map(([number, label]) => (
            <div key={label}>
              <b className="text-2xl md:text-3xl">{number}</b>
              <p className="text-sm text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 py-16 border-b border-gray-200">
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-gray-400">
              Built for curious travelers
            </p>
            <h2 className="text-3xl font-extrabold mt-4">
              Technology should bring heritage closer, not get in the way.
            </h2>
          </div>
          <p className="text-gray-600 leading-7">
            Hanoi Audio Guide combines local stories, multilingual narration,
            maps and proximity-aware discovery in one calm editorial experience.
            The core is designed to grow from the web into React Native while
            keeping data, audio and product logic reusable.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 py-16">
          {features.map(([number, title, description]) => (
            <article key={number} className="border-t-2 border-gray-900 pt-5">
              <span className="text-xs text-gray-400">{number}</span>
              <h2 className="font-bold text-lg mt-3">{title}</h2>
              <p className="text-sm text-gray-600 mt-3 leading-6">
                {description}
              </p>
            </article>
          ))}
        </div>
        <section className="rounded-2xl bg-gray-50 border border-gray-200 p-8 md:p-10 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Radio size={17} /> Open audio architecture
            </div>
            <p className="text-sm text-gray-600 leading-6 mt-3 max-w-2xl">
              The same heritage data can power web cards, mobile screens, audio
              playback and future cultural partnerships.
            </p>
          </div>
          <Smartphone className="text-gray-400" size={48} />
        </section>
      </section>
    </main>
  );
}
