import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => {
  return (
    <div className='header'>
      <div></div>
      <div className='header__logo'>
        <Link to='/'>
          <span>Christina Dymova</span>
        </Link>
      </div>
      <ul className='header__links'>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;