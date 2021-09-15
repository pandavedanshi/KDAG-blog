import React, { useEffect } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {
    const navColor = (e) => {
      let nav = document.getElementsByClassName("nav")[0];
      nav.classList.toggle("scrolled", window.scrollY > 0);
    };
    navColor();
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
            <Link to="/">LOGO</Link>
            {/* <!-- TODO: logo --> */}
          </div>
          <div className="nav-items">
            <div className="nav-item">
              <Link to="#">Projects</Link>
            </div>
            <div className="nav-item">
              <Link to="#">FAQ</Link>
            </div>
            <div className="nav-item">
              <Link to="/blogs">Blog</Link>
            </div>
            <div className="nav-item">
              <Link to="#">Go Down</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
