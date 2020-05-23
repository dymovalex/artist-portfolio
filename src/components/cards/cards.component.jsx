import React, { useContext, useState, useEffect } from 'react';

import Card from '../card/card.component';
import Spinner from '../spinner/spinner.component';

import { CardsContext } from '../../providers/cards.provider';

import { getImagesFromFirestore } from '../../firebase/firebase.utils';

import './cards.styles.scss';

const Cards = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { cards, setCards } = useContext(CardsContext);

  useEffect(() => {
    setIsLoading(true);
    getImagesFromFirestore()
      .then(images => {
        setCards(images);
        setIsLoading(false);
      });
  }, []);

  return (
    !isLoading ?
      <div className='cards'>
        {
          cards.map(card => (
            <Card key={card.id} card={card} />
          ))
        }
      </div> :
      <Spinner />
  );
};

export default Cards;