import React, { useState } from 'react';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      let message = '';

      switch (error.code) {
        case 'auth/user-not-found':
          message = `This user doesn't have administrator rights or doesn't exist. Please try again`;
          break;
        case 'auth/wrong-password':
          message = `Wrong password. Please try again`;
          break;
        default:
          message = error.message;
          break;
      }

      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 4000)
    }
  }

  return (
    <div className='sign-in'>
      {
        errorMessage ?
          <div className='sign-in__error-message'>
            <span><i className="fas fa-exclamation-triangle"></i>{errorMessage}</span>
          </div> :
          null
      }
      <form className='sign-in__form' onSubmit={(e) => signIn(e)}>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type='submit' value='Sign in' />
      </form>
    </div>
  );
};

export default SignIn;