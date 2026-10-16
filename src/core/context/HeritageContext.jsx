import { createContext, useContext, useEffect, useState } from "react";
import { languages } from "../data/hanoiHeritageSites";
const C = createContext();
export function HeritageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en",
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );
  const [listened, setListened] = useState(
    Number(localStorage.getItem("listened") || 0),
  );
  useEffect(() => localStorage.setItem("lang", language), [language]);
  useEffect(
    () => localStorage.setItem("favorites", JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(() => localStorage.setItem("listened", listened), [listened]);
  const toggleFavorite = (id) =>
    setFavorites((x) =>
      x.includes(id) ? x.filter((i) => i !== id) : [...x, id],
    );
  return (
    <C.Provider
      value={{
        language,
        setLanguage,
        favorites,
        toggleFavorite,
        listened,
        addListened: () => setListened((x) => x + 1),
        languages,
      }}
    >
      {children}
    </C.Provider>
  );
}
export const useHeritage = () => useContext(C);
