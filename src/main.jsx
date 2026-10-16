import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App";
import { HeritageProvider } from "./core/context/HeritageContext";
import { AudioProvider } from "./core/context/AudioPlayerContext";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeritageProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </HeritageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
