import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={`resources-list-header ${isVisible ? 'show' : ''}`}>
        <div className="resources-list-header-title">Gallery</div>
        <div
          className="resources-list-header-subtitle"
          style={{ fontSize: '1.15rem' }}
        >
          Join us on a visual journey through our history. Our event gallery
          captures the energy, innovation, and collaboration that define our
          community. Explore behind-the-scenes glimpses and hands-on projects
          that have shaped our journey.
        </div>
      </div>
    </div>
  );
};

export default Header;
