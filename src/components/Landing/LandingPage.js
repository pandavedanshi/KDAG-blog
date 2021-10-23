import React from "react";
import "./LandingPage.css";

//Components
import Navbar from "./../Common/Navbar/Navbar.js";
import Header from "./Header/Header.js";
import Content from "./Content/Content.js";
import logo from "../../assets/pics/KDAG_logo_full.jpeg";
import Fade from "react-reveal/Fade";
// import Contact from "./Contact/Contact";

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
        <Fade bottom>
        <div className="Hackathon-button">
          <a href="/" target="_blank" rel="noreferrer noopener" className="Hackathon-button-button">Register for our upcoming Hackathon</a>
        </div>
        </Fade>


        <div className="about-kdag-wrapper">
        

        <div className="about-kdag">
        <Fade left>
        <div className="about-kdag-image">
          <img src={logo} alt="LOGO" />
        </div>
        </Fade>

<Fade right>

        <div className="about-kdag-text">
        <h1 className="heading-about-kdag">About Us</h1>
        <hr className="rule-about-kdag"/>
        <i>"KDAG is aimed at bringing Data Analytics and Machine Learning enthusiasts together under the umbrella of a single society, and provide ample opportunities & resources that are required to build a successful career in this emerging domain."</i>
        </div>
</Fade>
        </div>
        </div>
        <Content />
      </section>

      {/* Contact Section */}
      {/*<section className="section-contacts">
        <Contact />
      </section>*/}
    </>
  );
};

export default LandingPage;
