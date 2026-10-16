import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { sites, t } from "../core/data/hanoiHeritageSites";
import { getCategoryTextClass } from "../core/utils/categoryStyles";
import { useHeritage } from "../core/context/HeritageContext";
import SiteCard from "../components/cards/ExploreSiteCard";
export default function ExplorePage() {
  const { language } = useHeritage();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("All");
  const districts = ["All", ...new Set(sites.map((s) => s.district))];
  const filtered = useMemo(
    () =>
      sites.filter(
        (s) =>
          (district === "All" || s.district === district) &&
          `${s.name.en} ${s.name.vi} ${s.description.en}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [q, district],
  );
  return (
    <main className="site-main">
      <section className="bg-gradient-to-b from-gray-200/70 via-gray-100/30 to-white py-16 text-center">
        <div className="container">
          <p className="text-xs uppercase tracking-[.25em] text-gray-500">
            Hanoi audio guide
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
            {t[language]?.explore || "Explore Hanoi"}
          </h1>
          <p className="text-gray-500 mt-4">{t[language]?.subtitle}</p>
          <p className="text-xs text-gray-500 mt-4 flex justify-center gap-1">
            <MapPin size={14} />9 heritage sites in Hanoi
          </p>
          <div className="max-w-xl mx-auto mt-7 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-slate-300 bg-white transition-all focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t[language]?.search}
              className="explore-search-input w-full bg-transparent border-0 !border-transparent outline-none !outline-none focus:outline-none focus-visible:!outline-none focus:ring-0 focus-visible:!ring-0 focus:border-transparent shadow-none !shadow-none text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center mt-4">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setDistrict(d)}
                className={
                  district === d
                    ? "bg-black text-white rounded-full px-4 py-2 text-xs"
                    : "bg-white border border-slate-300 rounded-full px-4 py-2 text-xs hover:border-black"
                }
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="container py-4">
        <p className="text-xs text-gray-500 mb-5">
          Showing {filtered.length} of {sites.length} sites
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <SiteCard key={s.id} site={s} />
          ))}
        </div>
      </section>
    </main>
  );
}
