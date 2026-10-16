import { useEffect, useState } from "react";
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(initial));
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}
export function useGeolocation() {
  const [position, setPosition] = useState(null),
    [error, setError] = useState("");
  const locate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPosition([p.coords.latitude, p.coords.longitude]);
        setError("");
      },
      (e) => setError(e.message),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };
  return { position, error, locate };
}
