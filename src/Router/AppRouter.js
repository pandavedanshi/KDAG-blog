import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../components/Landing/LandingPage";
import BlogPage from "../components/Blog/BlogPage";

const AppRouter = () => {
  return (
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
  );
};

export default AppRouter;
