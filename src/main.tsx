import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ProgressProvider } from "./hooks/useProgress";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><HashRouter><ProgressProvider><App /></ProgressProvider></HashRouter></StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    navigator.serviceWorker.register("./sw.js")
      .then((registration) => registration.update())
      .catch(() => undefined);
  });
}
