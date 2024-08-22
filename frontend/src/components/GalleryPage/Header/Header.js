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
          Fucking good time never hurt nobody. I got a little drink but its not
          Bacardi. If you loved the girl then I'm so so sorry. I got to give it
          to her like we're in a marriage.
        </div>
      </div>
    </div>
  );
};

export default Header;
