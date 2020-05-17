import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import Cards from './components/cards/cards.component';
import Modal from './components/modal/modal.component';
import AdminPanel from './components/admin-panel/admin-panel.component';

import ModalProvider from './providers/modal.provider';
import CardsProvider from './providers/cards.provider';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Header />
      <CardsProvider>
        <Switch>
          <Route
            exact
            path='/'
            render={
              () => (
                <React.Fragment>
                  <ModalProvider>
                    <Cards />
                    <Modal />
                  </ModalProvider>
                </React.Fragment>
              )
            }
          />
          <Route exact path='/admin' component={AdminPanel} />
        </Switch>
      </CardsProvider>
    </div>
  );
}

export default App;