/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { App } from "./App";

import { NavProvider } from "@/modules/router";
function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <NavProvider>
      <App />
    </NavProvider>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
