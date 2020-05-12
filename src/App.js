import React from 'react';

import Header from './components/header/header.component';
import Cards from './components/cards/cards.component';
import Modal from './components/modal/modal.component';

import ModalProvider from './providers/modal.provider';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Header />
      <ModalProvider>
        <Cards />
        <Modal />
      </ModalProvider>
    </div>
  );
}

export default App;