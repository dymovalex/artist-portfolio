import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [originSizeOfAnImage, setOriginSizeOfAnImage] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalVisibility,
        imageUrl,
        originSizeOfAnImage,
        setModalVisibility,
        setImageUrl,
        setOriginSizeOfAnImage,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;