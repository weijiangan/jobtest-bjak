import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import Catalog from "./Catalog";
import TitleDetails from "./TitleDetails";

import "normalize.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/details/:id" component={TitleDetails} />
        <Route component={Catalog} />
      </Switch>
    </Router>
  );
}

export default hot(App);
