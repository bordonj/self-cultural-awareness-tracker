import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase';
import axios from "axios";

const Signin = (props) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()
  const auth = props.firebase.auth();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log(loggedInUser)
      const foundUser = loggedInUser
      setUser(foundUser);
    }
  }, []);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      console.log('successfully sign up!');
    }).catch((error) => {
      console.log(error.message);
    });
  }

  function doSignIn(event) {
    event.preventDefault();
    // const user = { email, password };
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      console.log('response email', response.user.email)
      console.log('response', response)
      setUser(response.user.email);
      localStorage.setItem('user', response.user.email)
      console.log('successfully signed in!', firebase.auth().currentUser.email);
    }).catch((error) => {
      console.log(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(() => {
      console.log('successfully signout!');
      setUser({});
      setEmail("");
      setPassword("");
      localStorage.clear();
    }).catch(error => {
      console.log(error.message);
    });
  }
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    return (
      <>
        <div>{auth.currentUser.email} is logged in</div>
        <h1>Sign Out</h1>
        <button onClick={doSignOut}>Sign out</button>
      </>
    )
  };
  
  


  return (
    <React.Fragment>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input 
          type='text'
          name='signinEmail'
          placeholder='email'
          onChange={({ target }) => setEmail(target.value)}
        />
        <input 
          type='password'
          name='signinPassword'
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit'>Sign in</button>
      </form>
    </React.Fragment>
  )
}

export default withFirestore(Signin);