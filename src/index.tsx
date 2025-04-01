import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const element = document.getElementById("root");
if (element) {
  const root = createRoot(element);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
