import React, { useEffect, useContext } from 'react';

import DashboardCard from '../dashboard-card/dashboard-card.component';

import { CardsContext } from '../../providers/cards.provider';
import { CardCreatorContext } from '../../providers/card-creator.provider';

import { getImagesFromFirestore } from '../../firebase/firebase.utils';

import './dashboard.styles.scss';

const Dashboard = () => {
  const { cards, setCards } = useContext(CardsContext);
  const { setCardCreatorVisibility } = useContext(CardCreatorContext);

  useEffect(() => {
    getImagesFromFirestore()
      .then(images => setCards(images));
  }, []);

  return (
    <div className='dashboard'>
      <div className='header'>
        <div className='header__logo'>
          <span>Christina Dymova</span>
          <span>portfolio dashboard</span>
        </div>
        <button onClick={() => setCardCreatorVisibility(true)}>Add a new artwork</button>
      </div>
      {
        cards.map(card => (
          <DashboardCard key={card.id} card={card} />
        ))
      }
    </div>
  );
};

export default Dashboard;