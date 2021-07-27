import React from "react";
import "./LandingPage.css";

//Components
import Navbar from "./../Common/Navbar/Navbar.js";
import Header from "./Header/Header.js";
import Content from "./Content/Content.js";
import Contact from "./Contact/Contact";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="section-landing-header">
        <Header />
      </section>

      {/* content section  */}
      <section className="section-contents">
        <Content />
      </section>

      {/* Contact Section */}
      <section className="section-contacts">
        <Contact />
      </section>
    </>
  );
};

export default LandingPage;