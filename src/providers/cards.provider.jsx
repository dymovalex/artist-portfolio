import React, { createContext, useState } from 'react';
import CARDS_CONTENT from '../components/cards/cards.content';

export const CardsContext = createContext();

const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;