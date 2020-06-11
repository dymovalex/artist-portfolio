import React, { useState, useContext, useEffect } from 'react';

import { ModalContext } from '../../providers/modal.provider';
import { AppContext } from '../../providers/app.provider';

import './modal.styles.scss';

const Modal = () => {
  const { modalVisibility, setModalVisibility, imageUrl, originSizeOfAnImage, setOriginSizeOfAnImage } = useContext(ModalContext);
  const { setOverflowHidden } = useContext(AppContext);

  const [imageX, setImageX] = useState(0);
  const [imageY, setImageY] = useState(0);
  
  const [topIndent, setTopIndent] = useState(0);
  const [leftIndent, setLeftIndent] = useState(0);

  useEffect(() => {
    const image = document.querySelector('.inner__image');
    //console.log(image.offsetWidth, image.offsetHeight);
    setImageX(image.offsetWidth);
    setImageY(image.offsetHeight);
  }, [originSizeOfAnImage])

  const handleMouseMove = (e) => {
    if(!originSizeOfAnImage) return;
    //setLeftIndent()
    console.log(window.innerWidth);
    console.log(e.clientX);
    setTopIndent(- imageY / window.innerHeight * e.clientY);
    setLeftIndent(- imageX / window.innerWidth * e.clientX);
  };

  const handleImgClick = (e) => {
    if(!originSizeOfAnImage) {
      setOriginSizeOfAnImage(true);
    } else {
      setOriginSizeOfAnImage(false);
    }
    console.log(e.currentTarget);
    console.log(e.currentTarget.offsetWidth, e.currentTarget.offsetHeight);
  };

  return (
    <div className={`modal ${modalVisibility ? 'visible' : ''}`}           onClick={handleImgClick}
    onMouseMove={handleMouseMove}>
      <div className='inner'>
        <div
          className='inner__close-button'
          onClick={() => {
            setModalVisibility(false);
            setOverflowHidden(false);
          }}
        >
          <i className="fas fa-times" ></i>
        </div>
        <img
          src={imageUrl}
          alt='full screen'
          className={`${originSizeOfAnImage ? 'origin-size' : ''} inner__image`}
          style={{
            top: `${topIndent}px`,
            left: `${leftIndent}px`
          }}
        />
      </div>
    </div>
  );
};

export default Modal;