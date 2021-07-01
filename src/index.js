import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { initialize as initializeFirebase } from "./resources/firebase.js";

initializeFirebase();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
