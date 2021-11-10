import React, { useEffect } from "react";
import "./LandingPage.css";

//Components
import Navbar from "./../Common/Navbar/Navbar.js";
import Header from "./Header/Header.js";
import Content from "./Content/Content.js";
import logo from "../../assets/pics/KDAG_logo_full.jpeg";
import hack_poster from "../../assets/pics/HACKPoster.png"; 
import Fade from "react-reveal/Fade";
// import Contact from "./Contact/Contact";

const LandingPage = () => {
  useEffect(() => {
    var modal=document.getElementById('modal-box');
    // var modalClick=document.getElementById('modal-click');

    document.getElementById('modal-close').addEventListener('click',function(e){
        modal.style.display='none';
        // modalClick.style.display='none';
    })

    window.onclick = function(event) {
        if (event.target !== modal) {
          modal.style.display = "none";
          // modalClick.style.display='none';
        }
    }
  }, [])

  return (
    <>
      <Navbar />

      {/* <div id="modal-click" className="modal-background">
        <br />
      </div> */}
      <div id="modal-box" class="modal-box">
          <img src={hack_poster} alt="" />
          <label for="modal-click" id="modal-close" class="fas fa-times">
              
          </label>
      

          <div class="modal-content">
              <p>
                  KDSH aims to foster innovative analytical thinking as well as data science skills in the participants through a real-world challenge.
              </p>
          </div>

          <div class="modal-registration">
              <a href="http://tinyurl.com/kdshreg" target="_blank" rel="noreferrer noopener">
                  <div class="modal-register-btn">
                      <span>
                        Register for Kharagpur Data Science Hackathon
                      </span>
      
                  </div>
              </a>
            
          </div>

       
      </div>

      {/* Header Section */}
      <section className="section-landing-header">
        <Header />
      </section>

      {/* content section  */}
      <section className="section-contents">
        <Fade bottom>
        <div className="Hackathon-button">
          <div className="Hackathon-button-button"><a href="http://tinyurl.com/kdshreg" target="_blank" rel="noreferrer noopener">Register for Kharagpur Data Science Hackathon</a></div>
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
