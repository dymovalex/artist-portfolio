import React, { useContext, useRef, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import Hero from './components/hero/hero.component';
import Cards from './components/cards/cards.component';
import Modal from './components/modal/modal.component';
import Dashboard from './components/dashboard/dashboard.component';
import CardCreator from './components/card-creator/card-creator.component';
import SignIn from './components/sign-in/sign-in.component';

import ModalProvider from './providers/modal.provider';
import CardsProvider from './providers/cards.provider';
import CardCreatorProvider from './providers/card-creator.provider';

import { UserContext } from './providers/user.provider';
import { AppContext } from './providers/app.provider';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

const App = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { overflowHidden } = useContext(AppContext);

  useEffect(() => {
    let unsubscribeFromAuth = null;
    console.log('App is mounting', currentUser);
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => unsubscribeFromAuth();

  }, []);

  return (
    <div
      className="App"
      style={{ overflow: overflowHidden ? 'hidden' : 'auto' }}
    >
      <Switch>
        <CardsProvider>
          <Route
            exact
            path='/'
            render={
              () => (
                <React.Fragment>
                  <Header />
                  <Hero />
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
              () => currentUser ? (
                <React.Fragment>
                  <CardCreatorProvider>
                    <Dashboard />
                    <CardCreator />
                  </CardCreatorProvider>
                </React.Fragment>
              ) :
                (<Redirect to='/signin' />)
            }
          />
          <Route
            exact
            path='/signin'
            render={
              () => currentUser ?
                (<Redirect to='/admin' />) :
                (<SignIn />)
            } />
        </CardsProvider>
      </Switch>
    </div>
  );
}

export default App;