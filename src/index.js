import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Router } from "react-chrome-extension-router";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
