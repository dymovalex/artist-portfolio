import React, { useState } from 'react';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='sign-in'>
      <form className='sign-in__form'>
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
        <button onClick={(e) => signIn(e)}>Submit</button>
      </form>
    </div>
  );
};

export default SignIn;