import React, { useEffect } from "react";
import GlobalStyles from "../resources/GlobalStyles.js";
import { initialize as initializeFirebase } from "../resources/firebase.js";
import Home from "../pages/Home.js";
import StoreProvider from "../components/StoreProvider.js";

function App() {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <>
      <StoreProvider>
        <GlobalStyles />
        <Home />
      </StoreProvider>
    </>
  );
}

export default App;
