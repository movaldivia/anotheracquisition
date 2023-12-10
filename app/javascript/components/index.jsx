import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = window.eventillConfig.hostURL;

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(<App />);
});
