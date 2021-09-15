import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../components/Landing/LandingPage";
import BlogPage from "../components/Blog/BlogPage";

const AppRouter = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/blogs">
            <BlogPage />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};

export default AppRouter;
