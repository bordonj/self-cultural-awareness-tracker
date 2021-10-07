import React, { useState, useEffect } from "react";
import { withFirestore, isLoaded } from 'react-redux-firebase';
import styled from "styled-components";

const Margin = styled.div`
  margin: 0 10%;
`;

const Home = (props) => {
  console.log('home props', props)
  const auth = props.firebase.auth();
  console.log('auth', auth);
  console.log('auth.currentUser', auth.currentUser)
  const [signedIn, setSignedIn] = useState('');
  const [user, setUser] = useState();
  console.log('user home', user);

  useEffect(() => {
    setInterval(() => {
      const user = localStorage.getItem("user");
      setUser(user);
      }, [])
  }, 5000);

  
  if(!isLoaded(auth)) {
    return (
      <>
      <Margin>
        <h1>Loading...</h1>
      </Margin>
      </>
    )
  } else {
    if (user) {
      return (
        <>
        <Margin>
          <h1>Hi {user}! Welcome to "Know Myself":</h1> 
          <p>This is an app to help users better understand themselves, biases, and triggers better. All with the ultimate goal of becoming better people.</p>
          <p>Here, you can keep track of your own reactions to controversial topics.</p>
          <p>There's also access to some lessons (unfinished), but it's a start!</p>
        </Margin>
        </>
      )
    } else {
      return (
        <>
        <Margin>
          <h1>Welcome, please sign in to access features.</h1>
        </Margin>
        </>
      )
    }
  }
}


export default withFirestore(Home);