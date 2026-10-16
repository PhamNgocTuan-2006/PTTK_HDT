import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useHeritage } from "./HeritageContext";

const AudioContext = createContext(null);
const speechLang = {
  vi: "vi-VN",
  en: "en-US",
  fr: "fr-FR",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
};
const transcript = (site) =>
  Object.values(site.description).join(" ") +
  " " +
  site.highlights.join(". ") +
  ". Explore the layers of Hanoi history, architecture, memory and living culture through this audio guide.";

export function AudioProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [language, setLanguage] = useState("en");
  const audio = useRef(null);
  const speech = useRef(null);
  const { addListened } = useHeritage();

  const stop = (clearCurrent = false) => {
    window.speechSynthesis?.cancel();
    audio.current?.pause();
    audio.current = null;
    setPlaying(false);
    if (clearCurrent) {
      setCurrent(null);
      setProgress(0);
      setDuration(0);
    }
  };
  const start = (site, from = 0) => {
    stop();
    setCurrent(site);
    setProgress(from);
    addListened();
    if (site.audio) {
      const player = new Audio(site.audio);
      player.volume = volume;
      player.playbackRate = rate;
      player.onloadedmetadata = () =>
        setDuration(player.duration || site.duration * 60);
      player.ontimeupdate = () => {
        setProgress(
          player.duration ? (player.currentTime / player.duration) * 100 : 0,
        );
        setDuration(player.duration || site.duration * 60);
      };
      player.onended = () => setPlaying(false);
      audio.current = player;
      player.currentTime = (from / 100) * (site.duration * 60);
      player.play().catch(() => setPlaying(false));
    } else if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(transcript(site));
      utterance.lang = speechLang[language] || "en-US";
      utterance.rate = rate;
      utterance.volume = volume;
      utterance.onend = () => setPlaying(false);
      speech.current = utterance;
      window.speechSynthesis.speak(utterance);
      setDuration(site.duration * 60);
    }
    setPlaying(true);
  };
  const play = (site) => {
    if (current?.id !== site.id) return start(site);
    if (playing) {
      audio.current?.pause();
      window.speechSynthesis?.pause();
      setPlaying(false);
    } else {
      audio.current?.play();
      window.speechSynthesis?.resume();
      setPlaying(true);
    }
  };
  const seek = (value) => {
    setProgress(value);
    if (audio.current)
      audio.current.currentTime =
        (value / 100) * (audio.current.duration || duration);
  };
  const seekSeconds = (seconds) => {
    if (!current) return;
    if (audio.current) {
      audio.current.currentTime = Math.max(
        0,
        Math.min(
          audio.current.duration || duration,
          audio.current.currentTime + seconds,
        ),
      );
    } else {
      const next = Math.max(
        0,
        Math.min(
          100,
          progress + (seconds / (duration || current.duration * 60)) * 100,
        ),
      );
      setProgress(next);
    }
  };
  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
      audio.current.playbackRate = rate;
    }
  }, [volume, rate]);
  useEffect(() => () => stop(), []);
  return (
    <AudioContext.Provider
      value={{
        current,
        playing,
        play,
        stop,
        closePlayer: () => stop(true),
        togglePlay: () => current && play(current),
        setPlaying,
        rate,
        setRate,
        volume,
        setVolume,
        progress,
        seek,
        seekSeconds,
        duration,
        language,
        setLanguage,
        transcript,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
export const useAudio = () => useContext(AudioContext);
