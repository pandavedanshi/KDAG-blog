import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';
import logo from "../../../assets/pics/KDAG_logo.jpeg"
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
                        <h4 class="ui inverted header">Contact Us</h4>
                        <div class="ui inverted link list">
                            <a target="_blank" rel="noreferrer noopener" href="https://www.facebook.com/kgpdag" class="item">Facebook</a>
                            <a href="mailto:kdagiitkgp@gmail.com" class="item">kdagiitkgp@gmail.com</a>
                        </div>
                    </div>
                    <div class="six wide column">
                        <h4 class="ui inverted header">Kharagpur Data Analytics Group</h4>
                        <div class="ui inverted link list"><a href="http://iitkgp.ac.in" class="item">Indian Institute of Technology Kharagpur, India</a></div>
                    </div>
                </div>
                <div class="ui inverted section divider"></div>

                <a href="index.html"><img src={logo} class="ui centered mini image footer-image" alt="kdag-logo" /></a> &nbsp;

                <div class="ui horizontal inverted small divided link list">
                    <a class="item" href="http://iitkgp.ac.in">IIT KGP</a>
                    <a class="item" href="/contact">Contact Us</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
