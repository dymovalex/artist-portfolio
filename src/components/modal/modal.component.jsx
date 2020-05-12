import React, { useContext } from 'react';

import { ModalContext } from '../../providers/modal.provider';

import './modal.styles.scss';

const Modal = () => {
  const { modalVisibility, setModalVisibility, imageUrl } = useContext(ModalContext);

  return (
    <div className={`modal ${modalVisibility ? 'visible' : ''}`}>
      <div className='inner'>
        <div className='inner__close-button' onClick={() => setModalVisibility(false)}>
          <i className="fas fa-times" ></i>
        </div>
        <img src={imageUrl} alt='full screen' />
      </div>
    </div>
  );
};

export default Modal;