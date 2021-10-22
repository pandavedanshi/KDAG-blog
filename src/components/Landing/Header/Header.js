import React from "react";
import "./Header.css";
import logoRed from "./../../../assets/pics/KDAG_logo.jpeg";
import logoBlue from "./../../../assets/svgs/logo-blue.svg";
import headerGraphics from "./../../../assets/pics/main-screen.png";
import logoTrans1 from "./../../../assets/svgs/logo-trans-1.svg";
const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-title">
          <div className="header-title-logo">
            {/* <!-- TODO: logo --> */}
            <img src={logoRed} alt="KDAG logo" />
          </div>
          <div className="header-title-text">
            <span>K</span>haragpur
            <br />
            <span>D</span>ata{"   "}
            <span>A</span>nalytics{"  "}
            <span>G</span>roup{"   "}
          </div>
        </div>
        <div className="header-graphics">
          <img
            className="header-image"
            src={headerGraphics}
            alt="GRAPHICS SHOWING DATA"
          />
        </div>
      </div>
      <div className="stripe"></div>
      <div className="random-svg-1">
        <img src={logoTrans1} width="300" alt="" />
      </div>
      <div className="random-svg-2">
        <img src={logoBlue} width="1000" alt="" />
      </div>
    </>
  );
};

export default Header;
