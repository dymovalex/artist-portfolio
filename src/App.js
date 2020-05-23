import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import Cards from './components/cards/cards.component';
import Modal from './components/modal/modal.component';
import Dashboard from './components/dashboard/dashboard.component';
import CardCreator from './components/card-creator/card-creator.component';

import ModalProvider from './providers/modal.provider';
import CardsProvider from './providers/cards.provider';
import CardCreatorProvider from './providers/card-creator.provider';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <CardsProvider>
          <Route
            exact
            path='/'
            render={
              () => (
                <React.Fragment>
                  <Header />
                  <ModalProvider>
                    <Cards />
                    <Modal />
                  </ModalProvider>
                </React.Fragment>
              )
            }
          />
          <Route
            exact
            path='/admin'
            render={
              () => (
                <React.Fragment>
                  <CardCreatorProvider>
                    <Dashboard />
                    <CardCreator />
                  </CardCreatorProvider>
                </React.Fragment>
              )
            }
          />
        </CardsProvider>
      </Switch>
    </div>
  );
}

export default App;