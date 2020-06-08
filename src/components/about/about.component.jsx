import React from 'react';

import './about.styles.scss';

const About = () => {
  return (
    <div className='about'>
      <div className='image' style={{  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/avatar.jpg)` }}></div>
      <div className='description'>
        <h2>About me</h2>
        <div className='description__text'>I started drawing at an early age. When my parents noticed the inclination for this, I took a kids drawing course of sorts, and then went to an art school followed by an art college. My relationship with art, though, has been pretty complicated due to different issues, resulting in having multiple breaks from drawing – the longest one lasting several years.</div>

        <div className='description__text'>Now my desire to draw is fueled by wanting to prove, mainly to myself, that I can get better at this. I take time to hone the skill by researching, practicing and, most importantly, finishing what I paint (I used to abandon a piece the moment I didn’t feel like working on it anymore.) In the long run, I dream of getting as good as the artists I look up to.</div>

        <div className='description__text'>Like many, I used traditional materials to create artworks at first, but now I’m into digital painting and the occasional sketching with pencil or charcoal.</div>

        <div className='description__text'>Work-wise, my aspiration is to land a job in the game development sphere to have a peek at how games come to life.</div>

        <div className='description__text'>As for my personal taste, I have a soft spot for ‘messy’ bold paintings that stand out and catch your eye. I’m currently exploring Photoshop and trying to find my own style that I will enjoy working in and looking at.</div>

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