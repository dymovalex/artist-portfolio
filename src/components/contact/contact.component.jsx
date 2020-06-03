import React from 'react';

import './contact.styles.scss';

const Contact = () => {
  return (
    <div className='contact'>
      <h2>Feel free to contact me with followings</h2>
      <div className='contact__links'>
        <span><i className="fab fa-vk"></i></span>
        <span><i className="fab fa-twitter"></i></span>
        <span><i className="fas fa-envelope"></i></span>
      </div>
    </div>
  );
};

export default Contact;