import React from 'react';

import './hero.styles.scss';

const Hero = () => {
  return (
    <div className='hero-container' style={{  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Taieri.png)` }}>
      <div className='hero'>
        <div className='hero__greetings'>
          <span className='hero__hi'>Hi! I am</span>
          <span className='hero__name'>Christina</span>
        </div>
        <span className='hero__description'>digital and analog artist</span>
      </div>
    </div>
  );
};

export default Hero;