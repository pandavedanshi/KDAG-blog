import React, { useEffect, useState } from "react";
import { Button } from './Button';
import "./Navbar.css";
import logo from "./../../../assets/pics/KDAG_logo.jpeg";
import Dropdown from './Dropdown';
import { Link, NavLink } from "react-router-dom";

const active_style = {
  borderBottom: "2px solid rgba(255, 255, 255, 0.7)",
  color: "rgba(255, 255, 255, 0.7)",
};

const Navbar = ({ color, noborder }) => {
  useEffect(() => {
    const navColor = (e) => {
      let nav = document.getElementsByClassName("kdag-nav")[0];
      nav.classList.toggle("scrolled", window.scrollY > 0);
    };
    navColor();
    document.addEventListener("scroll", navColor);
    return () => {
      document.removeEventListener("scroll", navColor);
    };
  }, []);
  
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
    console.log(dropdown);
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
    console.log(dropdown);
  };
  

  return (
    <div className="kdag-nav-container">
      <div className="kdag-nav">
        <div className={`kdag-nav-contain ${noborder? "" : "kdag-nav-contain-border"}`}>
          <div className="kdag-nav-logo">
            <Link to="/">
              <img src={logo} alt="LOGO" />
              <div className="kdag-navbar-kdag">
                KHARAGPUR DATA ANALYTICS GROUP
              </div>
            </Link>
          </div>
          <div className="kdag-nav-items">
            <div className="kdag-nav-item">
              <NavLink activeStyle={active_style} to="/events">
                Events
              </NavLink>
            </div>
            <div className="kdag-nav-item">
              <NavLink activeStyle={active_style} to="/resources">
                Resources
              </NavLink>
            </div>
            <div className="kdag-nav-item">
              <NavLink activeStyle={active_style} to="/blogs">
                Blog
              </NavLink>
            </div>
            <div className="kdag-nav-item">
              <NavLink 
              onClick={closeMobileMenu} 
              activeStyle={active_style}
              to="/team">
                Team
              </NavLink>
              {/* {dropdown && <Dropdown/>} */}
              
            </div>
            {/* <div className="kdag-nav-item">
              <Link to="#">Go Down</Link>
            </div> */}
          </div>
          <div className="kdag-nav-item">
              <NavLink activeStyle={active_style} to="/Register">
              </NavLink>
              <Button />
            </div>
          <nav className="kdag-nav-mobile drop">
            <ul className="kdag-nav-mobile-ul cf">
              <li>
                <svg
                  class="dropdown hamburgermenu"
                  width="76"
                  height="51"
                  viewBox="0 0 76 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="76"
                    height="11.7049"
                    rx="5.85246"
                    fill="white"
                    fill-opacity="0.3"
                  />
                  <rect
                    y="39.2951"
                    width="76"
                    height="11.7049"
                    rx="5.85246"
                    fill="white"
                    fill-opacity="0.3"
                  />
                  <rect
                    y="19.2295"
                    width="76"
                    height="11.7049"
                    rx="5.85246"
                    fill="white"
                    fill-opacity="0.3"
                  />
                </svg>

                {/* <img class="dropdown hamburgermenu" src={ham} alt="menu" /> */}

                <ul>
                  <li>
                    <NavLink to="/events">Events</NavLink>
                  </li>
                  <li>
                    <NavLink to="/resources">Resources</NavLink>
                  </li>
                  <li>
                    <NavLink to="/blogs">Blog</NavLink>
                  </li>
                  <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
                    <NavLink to="/team">Team</NavLink>
                  </li>
                  <li>
                    <NavLink to={{pathname: 'https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463'}} target="_blank">Register Now</NavLink>
                  </li>
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