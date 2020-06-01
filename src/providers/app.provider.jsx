import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [overflowHidden, setOverflowHidden] = useState(false);

  return (
    <AppContext.Provider
      value={{
        overflowHidden,
        setOverflowHidden
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;