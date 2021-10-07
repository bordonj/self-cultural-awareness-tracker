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
          <h1>Welcome {user}</h1>
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