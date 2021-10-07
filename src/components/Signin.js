import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase';
// import '../css/Signin.css'
import axios from "axios";
import styled from "styled-components";

// const Signin = (props) => { 
const Signin = ({ firebase, onUserFound }) => { 
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()
  const auth = firebase.auth();

  console.log('signup', signUp)
  console.log('signup', onUserFound)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log(loggedInUser)
      const foundUser = loggedInUser
      setUser(foundUser);
      onUserFound(foundUser);
    }
  }, []);
  // }, );

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
    // const user = { email, password };
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      console.log('response email', response.user.email);
      console.log('response', response)
      setUser(response.user.email);
      localStorage.setItem('user', response.user.email)
      localStorage.setItem('uid', response.user.uid)
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
      <div className="signin-ui">
        <div>{auth.currentUser.email} is logged in</div>
        <button className="signout ui button" onClick={doSignOut}>Sign out</button>
      </div>
      </>
    )
  };
  
  
  if (signUp === false) {
    return (
      <>
      <div className="signin-ui">
        <h1>Sign In</h1>
          <form className="ui form" onSubmit={doSignIn}>
            <div className="field">
              <input 
                type='text'
                name='signinEmail'
                placeholder='email'
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="field">
              <input 
                type='password'
                name='signinPassword'
                placeholder='password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className="ui button" type='submit'>Sign in</button>
          </form>
          <div>New user? <span className="link" onClick={() => {setSignUp(true)}}> Sign up</span></div>
      </div>
      
      </>

    )
  }

  return (
    <React.Fragment>
      <div className="signin-ui">
        <h1>Sign Up</h1>
        <form className="ui form" onSubmit={doSignUp}>
          <div className="field">
            <input
              type='text'
              name='email'
              placeholder='email' />
          </div>
          <div className="field">
            <input
              type='password'
              name='password'
              placeholder='password' />
          </div>
          <button className="ui button" type='submit'>Sign up</button>
        </form>
        <div>Already a user? <span className="link" onClick={() => {setSignUp(false)}}> Sign In</span></div>
      </div>
      
    </React.Fragment>
  )
}

export default withFirestore(Signin);