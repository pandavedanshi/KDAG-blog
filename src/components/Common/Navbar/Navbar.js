import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "./../../../assets/pics/KDAG_logo.jpeg";

import { Link, NavLink } from "react-router-dom";

const active_style = {
  borderBottom: "2px solid rgba(255, 255, 255, 0.7)",
  color: "rgba(255, 255, 255, 0.7)"
}

const Navbar = ({color}) => {
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
            <Link to="/"><img src={logo} alt="LOGO" /><div className="navbar-kdag">KHARAGPUR DATA ANALYTICS GROUP</div></Link>
          </div>
          <div className="nav-items">
            <div className="nav-item">
              <NavLink activeStyle={active_style} to="/events">Events</NavLink>
            </div>
            <div className="nav-item">
              <NavLink activeStyle={active_style} to="/resources">Resources</NavLink>
            </div>
            <div className="nav-item">
              <NavLink activeStyle={active_style} to="/blogs">Blog</NavLink>
            </div>
            <div className="nav-item">
              <NavLink activeStyle={active_style} to="/team">Team</NavLink>
            </div>
            {/* <div className="nav-item">
              <Link to="#">Go Down</Link>
            </div> */}
          </div>
          <nav class="drop">
          <ul class="cf">
        
          <li>
          <svg class="dropdown hamburgermenu" width="76" height="51" viewBox="0 0 76 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="76" height="11.7049" rx="5.85246" fill="white" fill-opacity="0.3"/>
          <rect y="39.2951" width="76" height="11.7049" rx="5.85246" fill="white" fill-opacity="0.3"/>
          <rect y="19.2295" width="76" height="11.7049" rx="5.85246" fill="white" fill-opacity="0.3"/>
          </svg>

            {/* <img class="dropdown hamburgermenu" src={ham} alt="menu" /> */}


            <ul>
              <li><NavLink to="/events">Events</NavLink></li>
              <li><NavLink to="/resources">Resources</NavLink></li>
              <li><NavLink to="/blogs">Blog</NavLink></li>
              <li><NavLink to="/team">Team</NavLink></li>
            </ul>
          </li>
       
          </ul>
          </nav>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
