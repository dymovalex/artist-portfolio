import React, { useContext, useEffect } from 'react';

import Card from '../card/card.component';
import Spinner from '../spinner/spinner.component';

import { CardsContext } from '../../providers/cards.provider';

import { getImagesFromFirestore } from '../../firebase/firebase.utils';

import './cards.styles.scss';

const Cards = () => {
  const { cards, setCards } = useContext(CardsContext);

  useEffect(() => {
    console.log('useEffect')
    getImagesFromFirestore()
      .then(images => setCards(images));
  }, []);

  return (
    <div className='cards'>
      {
        cards.map(card => (
          <Card key={card.id} card={card} />
        ))
      }
    </div>
  );
};

export default Cards;