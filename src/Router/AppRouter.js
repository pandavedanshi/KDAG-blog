import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "../components/Landing/LandingPage";
import BlogPage from "../components/Blog/BlogPage";
import ResourcesPage from "../components/Resources/ResourcesPage";
import EventsPage from "../components/Events/EventsPage";
import TeamPage from "../components/TeamPage/TeamPage";
import ScrollToTop from "../components/Common/ScrollToTop/ScrollToTop.js";
import WinterWorkshop from "../components/WinterWorkshop/WinterWorkshop";

import Footer from "../components/Common/Footer/Footer";
import WinterWorkshop from "../components/WinterWorkshop/WinterWorkshop";

const AppRouter = () => {
  return (
    <React.StrictMode>
      <Router>
        <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/blogs">
            <BlogPage />
          </Route>
          <Route path="/resources">
            <ResourcesPage />
          </Route>
          <Route path="/events">
            <EventsPage />
          </Route>
          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/winter-workshop">
            <WinterWorkshop />
          </Route>
        </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </React.StrictMode>
  );
};

export default AppRouter;
