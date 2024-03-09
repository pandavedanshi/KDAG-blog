import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import KDSH2022 from "../components/Events/Individual_Events/KDSH2022_bundle/KDSH2022";
import Navbar from "../components/Common/Navbar/Navbar";
import MousePointer from "../components/Common/MousePointer/MousePointer";
import LandingPage from "../components/Landing/LandingPage";
import BlogPage from "../components/Blog/BlogPage";
import ResourcesPage from "../components/Resources/ResourcesPage";
import EventsPage from "../components/Events/EventsPage";
import TeamPage from "../components/TeamPage/TeamPage";
import AlumniPage from "../components/AlumniPage/AlumniPage";
import ScrollToTop from "../components/Common/ScrollToTop/ScrollToTop.js";
import Footer from "../components/Common/Footer/Footer";
import WinterWorkshop from "../components/WinterWorkshop/WinterWorkshop";
import CertificateGeneration from "../components/CertificateGeneration/CertificateGeneration";
import ForumPage from "../components/DiscussionForum/ForumPage.js";
import DiscussionPage from "../components/DiscussionForum/DiscussionPage.js";
import AuthPage from "../components/AuthenticationPages/AuthPage.js";

const AppRouter = () => {
  return (
    <React.StrictMode>
      <Router>
        <MousePointer/>
        <Navbar />
        <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/KDSH2022">
            <KDSH2022 />
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
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/alumni">
            <AlumniPage />
          </Route>
          <Route path="/forum">
            <ForumPage />
          </Route>
          <Route path="/discussion_page_id">
            <DiscussionPage />
          </Route>
          <Route path="/winter-workshop">
            <WinterWorkshop />
          </Route>
          <Route path="/certificate-generation">
            <CertificateGeneration />
          </Route>
        </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </React.StrictMode>
  );
};

export default AppRouter;
