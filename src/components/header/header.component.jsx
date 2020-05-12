import React from 'react';

import './header.styles.scss';

const Header = () => {
  return (
    <div className='header'>
      <div></div>
      <div className='header__logo'>
        <span>Christine Dymova</span>
      </div>
      <ul className='header__links'>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Header;