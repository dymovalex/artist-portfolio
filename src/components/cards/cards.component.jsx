import React from 'react';

import Card from '../card/card.component';

import CARDS_CONTENT from './cards.content';

import './cards.styles.scss';

const Cards = () => {
  return (
    <div className='cards'>
      {
        CARDS_CONTENT.map(card => (
          <Card key={card.id} card={card} />
        ))
      }
    </div>
  );
};

export default Cards;