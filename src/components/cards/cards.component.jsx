import React, { useState, useEffect } from 'react';

import Card from '../card/card.component';

import CARDS_CONTENT from './cards.content';

import { getImagesFromFirestore } from '../../firebase/firebase.utils';

import './cards.styles.scss';

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {

    getImagesFromFirestore()
      .then((images) => setCards(images));
  }, []);

  return (
    <div className='cards'>
      {
        cards ?
          cards.map(card => (
            <Card key={card.id} card={card} />
          )) : null
      }
    </div>
  );
};

export default Cards;