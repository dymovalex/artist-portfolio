import React, { useContext } from 'react';

import { CardsContext } from '../../providers/cards.provider';
import { CardCreatorContext } from '../../providers/card-creator.provider';

import { deleteImageFromFirestore } from '../../firebase/firebase.utils';

import './dashboard-card.styles.scss';

const DashboardCard = ({ card }) => {
  const { getCard } = useContext(CardsContext);
  const { setCardCreatorVisibility } = useContext(CardCreatorContext);

  return (
    <div className='dashboard-card' key={card.id}>
      <div
        className='dashboard-card__edit-button'
        onClick={
          () => {
            getCard(card.id);
            setCardCreatorVisibility(true);
          }
        }>
        <i className="fas fa-pen-square"></i>
      </div>
      <div className='dashboard-card__delete-button' onClick={() => deleteImageFromFirestore(card)}>
        <i className="fas fa-minus-square"></i>
      </div>
      <div className='dashboard-card__img'>
        <img src={card.imageUrl} alt={card.name} />
      </div>
      <div className='dashboard-card__content'>
        <h2>{card.name}</h2>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;