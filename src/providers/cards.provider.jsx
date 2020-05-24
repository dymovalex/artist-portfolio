import React, { createContext, useState } from 'react';
//import CARDS_CONTENT from '../components/cards/cards.content';

export const CardsContext = createContext();

const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  const getCard = (id) => {
    setCurrentCard(cards.filter(card => card.id === id)[0]);
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
        currentCard,
        setCurrentCard,
        getCard
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;