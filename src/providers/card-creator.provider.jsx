import React, { createContext, useState } from 'react'

export const CardCreatorContext = createContext();

const CardCreatorProvider = ({ children }) => {
  const [cardCreatorVisibility, setCardCreatorVisibility] = useState(false);

  return (
    <CardCreatorContext.Provider
      value={{
        cardCreatorVisibility,
        setCardCreatorVisibility,
      }}
    >
      {children}
    </CardCreatorContext.Provider>
  );
};

export default CardCreatorProvider;