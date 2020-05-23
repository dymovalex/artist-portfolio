import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import DashboardCard from '../dashboard-card/dashboard-card.component';
import Spinner from '../spinner/spinner.component';

import { CardsContext } from '../../providers/cards.provider';
import { CardCreatorContext } from '../../providers/card-creator.provider';

import { getImagesFromFirestore } from '../../firebase/firebase.utils';

import './dashboard.styles.scss';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { cards, setCards } = useContext(CardsContext);
  const { setCardCreatorVisibility } = useContext(CardCreatorContext);

  useEffect(() => {
    setIsLoading(true);
    getImagesFromFirestore()
      .then(images => {
        setCards(images);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='dashboard'>
      <div className='header'>
        <div className='header__logo'>
          <Link to='/'>
            <span>Christina Dymova</span>
            <span>portfolio dashboard</span>
          </Link>
        </div>
        <button onClick={() => setCardCreatorVisibility(true)}>Add a new artwork</button>
      </div>
      {
        !isLoading ?
          <div className='dashboards__cards'>
            {cards.map(card => (
              <DashboardCard key={card.id} card={card} />
            ))}
          </div> :
          <Spinner />
      }
    </div>
  );
};

export default Dashboard;