import React, { useContext } from 'react';

import { CardCreatorContext } from '../../providers/card-creator.provider';

import './dashboard-card.styles.scss';

const DashboardCard = ({ card }) => {
  const { setCardCreatorVisibility } = useContext(CardCreatorContext);

  return (
    <div className='dashboard-card' key={card.id}>
      <div className='dashboard-card__edit-button' onClick={() => setCardCreatorVisibility(true)}>
        <i className="fas fa-pen-square"></i>
      </div>
      <div className='dashboard-card__img'>
        <img src={card.imageUrl} />
      </div>
      <div className='dashboard-card__content'>
        <h2>{card.name}</h2>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;