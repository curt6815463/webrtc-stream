import React, { useEffect } from "react";
import GlobalStyles from "../resources/GlobalStyles.js";
import { initialize as initializeFirebase } from "../resources/firebase.js";
import Home from "../pages/Home.js";

function App() {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Home />
    </>
  );
}

export default App;
