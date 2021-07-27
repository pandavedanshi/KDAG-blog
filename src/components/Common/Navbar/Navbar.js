import React, { useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const navColor = (e) => {
      let nav = document.getElementsByClassName("nav")[0];
      nav.classList.toggle("scrolled", window.scrollY > 0);
    };
    document.addEventListener("scroll", navColor);
    return () => {
      document.removeEventListener("scroll", navColor);
    };
  }, []);
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="nav-contain">
          <div className="nav-logo">
            LOGO
            {/* <!-- TODO: logo --> */}
          </div>
          <div className="nav-items">
            <div className="nav-item">Projects</div>
            <div className="nav-item">FAQ</div>
            <div className="nav-item">Blog</div>
            <div className="nav-item">Go Down</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
