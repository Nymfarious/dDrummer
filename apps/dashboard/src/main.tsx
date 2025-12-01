import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Runner from "./runner";
import "./index.css";

const mount = document.getElementById("root")!;
const root = createRoot(mount);

// Trim trailing slash so "/runner/" works too
const path = window.location.pathname.replace(/\/+$/, "");

if (path === "/runner") {
  root.render(<Runner />);
} else {
  root.render(<App />);
}
