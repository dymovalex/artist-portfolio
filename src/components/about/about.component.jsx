import React from 'react';

import './about.styles.scss';

const About = () => {
  return (
    <div className='about'>
      <div className='image' style={{  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/avatar.jpg)` }}></div>
      <div className='description'>
        <h2>About me</h2>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non tortor convallis, varius arcu sed, lacinia lectus. Vestibulum dignissim arcu non felis congue pulvinar. Aenean convallis faucibus tincidunt. Nulla viverra, tellus vel auctor pharetra, quam diam commodo nisl, pulvinar consectetur massa diam sit amet enim. Ut tempor, turpis ac sollicitudin consequat, enim lorem faucibus ante, dapibus cursus lorem enim pharetra enim. Vestibulum eget metus libero. Pellentesque vel rhoncus dui. Sed et mollis tortor. Etiam molestie sem sed sem scelerisque, eu pellentesque risus mattis.

          Ut non nisl auctor, scelerisque risus ut, blandit velit. Curabitur ac scelerisque leo. Pellentesque neque ligula, tincidunt congue faucibus sit amet, fermentum id mauris. Morbi quis sagittis tellus. Aenean finibus tortor vitae bibendum mollis. Donec mauris nulla, efficitur non malesuada ut, finibus ut nulla. Sed ligula nulla, vulputate vel blandit eget, congue a dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ac risus at eros aliquet ullamcorper. Nunc tempus augue quis hendrerit laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. In tempor tempor tellus, vel hendrerit mauris.
        </div>

        <div className='contacts'>
          <h2>Feel free to contact me with followings</h2>
          <div className='contacts__links'>
            <a href='mailto:dymovachristina@gmail.com' target='_blank' rel='noopener noreferrer'><i className="fas fa-envelope"></i></a>
            <a href='https://vk.com/bulkurochka'><i className="fab fa-vk"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;