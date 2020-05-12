import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ModalContext.Provider
      value={{
        modalVisibility,
        imageUrl,
        setModalVisibility,
        setImageUrl,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;