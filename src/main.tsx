import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// For some reason, es-lint wants me to to put this empty arrays

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App resultData={[]} regions={[]} subRegions={[]} />
  </React.StrictMode>
);
