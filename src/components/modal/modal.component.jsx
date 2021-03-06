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
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalVisibility, originSizeOfAnImage]);

  useEffect(() => {
    const image = document.querySelector('.inner__image');
    setImageX(image.offsetWidth);
    setImageY(image.offsetHeight);
  }, [originSizeOfAnImage]);

  const handleKeyDown = (e) => {
    if(e.key !== 'Escape') return;
    if(originSizeOfAnImage) {
      setOriginSizeOfAnImage(false);
    } else if(modalVisibility) {
      setModalVisibility(false);
      setOverflowHidden(false);
    }
  };

  const handleMouseMove = (e) => {
    if(!originSizeOfAnImage) return;
    setTopIndent(e.clientY - imageY / window.innerHeight * e.clientY);
    setLeftIndent(e.clientX - imageX / window.innerWidth * e.clientX);
  };

  const handleTouch = (e) => {
    e.preventDefault();
    if(!originSizeOfAnImage) return;
    const {clientX, clientY} = e.touches[0];
    setTopIndent(clientY - imageY / window.innerHeight * clientY);
    setLeftIndent(clientX - imageX / window.innerWidth * clientX);
  };

  const handleImgClick = () => {
    setOriginSizeOfAnImage(!originSizeOfAnImage);
  };

  return (
    <div
      className={`modal ${modalVisibility ? 'visible' : ''}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouch}
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
        <div className='inner__magnifying-glass'>
          <i className="fas fa-search-plus"></i>
        </div>
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