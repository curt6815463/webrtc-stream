import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "../resources/GlobalStyles.js";
import Home from "../pages/Home.js";
import Meet from "../pages/Meet.js";
import StoreProvider from "../components/StoreProvider.js";

function App() {
  return (
    <Router>
      <StoreProvider>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/meet/:meetId">
            <Meet />
          </Route>
        </Switch>
      </StoreProvider>
    </Router>
  );
}

export default App;
