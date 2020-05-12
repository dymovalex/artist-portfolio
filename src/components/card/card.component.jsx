import React, { useContext } from 'react';

import { ModalContext } from '../../providers/modal.provider';

import './card.styles.scss';

const Card = ({ card, ...otherProps }) => {
  const { setModalVisibility, setImageUrl } = useContext(ModalContext);

  const openModal = () => {
    setModalVisibility(true);
    setImageUrl(card.imageUrl);
  };

  return (
    <div className={`${card.orientation} card`}>
      <input type="checkbox" className="card__show-description" id={card.id} aria-hidden="true" />
      <div className='card__background-image' />
      <div className='content'>
        <div className='content__front' style={{ backgroundImage: `url(${card.imageUrl})` }}>
          <div className='content__name'>
            <span>{card.name}</span>
          </div>
          <div className='content__buttons-container'>
            <button className='content__button' onClick={openModal}>View</button>
            <button className='content__button'>
              <label htmlFor={card.id}>Details</label>
            </button>
          </div>
        </div>
        <div className='content__back'>
          <div className='content__name'>
            <span>{card.name}</span>
          </div>
          <div className='content__description'>
            <span>{card.description}</span>
          </div>
          <div className='content__buttons-container'>
            <button className='content__button content__button_inverse' onClick={openModal}>View</button>
            <button className='content__button content__button_inverse'>
              <label htmlFor={card.id}>Back</label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;