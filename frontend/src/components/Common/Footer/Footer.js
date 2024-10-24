import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Footer.css';
import logo from "../../../assets/pics/KDAG_logo.jpeg";
import facebookIcon from "../../../assets/pics/facebook.png"
import gmailIcon from "../../../assets/pics/gmail.png"
import linkedinIcon from "../../../assets/pics/linkedin.png"
import instagramIcon from "../../../assets/pics/instagram.png"
// import 'semantic-ui-css/semantic.min.css';

const Footer = () => {
    return (
        <div class="ui inverted vertical footer segment">
            <div class="ui center aligned container">
                <div class="ui stackable inverted divided grid">
                    <div class="four wide column">
                        <h4 class="ui inverted header">Main Menu</h4>
                        <div class="ui inverted link list">
                            <Link to="/events" class="item">Events</Link>
                            <Link to="/resources" class="item">Resources</Link>
                            <Link to="/blogs" class="item">Blog</Link>
                        
                        </div>
                    </div>
                    <div class="four wide column">
                        <h4 class="ui horizontal divided inverted header">Follow Us</h4>
                        <div class="ui horizontal inverted small divided link list">
                            <a target="_blank" rel="noreferrer noopener" href="https://www.facebook.com/kgpdag" class="item"><img src={facebookIcon} alt="Facebook" /></a>
                            <a target="_blank" rel="noreferrer noopener" href="https://www.linkedin.com/company/kdag/" class="item"><img src={linkedinIcon} alt="Linkedin" /></a>
                            <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/kdag.iitkgp/" class="item"><img src={instagramIcon} alt="Instagram" /></a>
                            <a href="mailto:kdagiitkgp@gmail.com" class="item"><img src={gmailIcon} alt="Mail" /></a>
                        </div>
                    </div>
                    <div class="six wide column">
                        <h4 class="ui inverted header">Kharagpur Data Analytics Group</h4>
                        <div class="ui inverted link list"><a href="http://iitkgp.ac.in" target="_blank" rel="noreferrer noopener" class="item">Indian Institute of Technology Kharagpur, India</a></div>
                    </div>
                </div>
                <div class="ui inverted section divider"></div>

                <a href="index.html"><img src={logo} class="ui centered mini image footer-image" alt="kdag-logo" /></a> &nbsp;

                <div class="ui horizontal inverted small divided link list">
                    <a class="item" target="_blank" rel="noreferrer noopener" href="http://iitkgp.ac.in">IIT KGP</a>
                    <NavLink to="/team">
                        | Contact Us
                    </NavLink>
                    <NavLink to="/privacy-policy">
                    &nbsp;| Privacy Policy
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Footer;
