import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "../resources/GlobalStyles.js";
import { initialize as initializeFirebase } from "../resources/firebase.js";
import Home from "../pages/Home.js";
import Meet from "../pages/Meet.js";
import StoreProvider from "../components/StoreProvider.js";

function App() {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <Router>
      <StoreProvider>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/meet">
            <Meet />
          </Route>
        </Switch>
      </StoreProvider>
    </Router>
  );
}

export default App;
