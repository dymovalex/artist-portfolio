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
    setImageX(image.offsetWidth);
    setImageY(image.offsetHeight);
  }, [originSizeOfAnImage]);

  const handleMouseMove = (e) => {
    if(!originSizeOfAnImage) return;
    setTopIndent(e.clientY - imageY / window.innerHeight * e.clientY);
    setLeftIndent(e.clientX - imageX / window.innerWidth * e.clientX);
  };

  const handleImgClick = () => {
    setOriginSizeOfAnImage(!originSizeOfAnImage);
  };

  return (
    <div
      className={`modal ${modalVisibility ? 'visible' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className='modal__close-button'
        onClick={() => {
          setModalVisibility(false);
          setOverflowHidden(false);
          setOriginSizeOfAnImage(false);
        }}
      >
        <i className="fas fa-times" ></i>
      </div>
      <div className='inner'>
        <img
          src={imageUrl}
          alt='full screen'
          className={`${originSizeOfAnImage ? 'origin-size' : ''} inner__image`}
          onClick={handleImgClick}
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