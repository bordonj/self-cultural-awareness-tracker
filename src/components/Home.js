import React, { useState, useEffect } from "react";
import { withFirestore, isLoaded } from 'react-redux-firebase';

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
      <h1>Loading...</h1>
      </>
    )
  } else {
    if (user) {
      return (
        <>
        <h1>welcome {user}</h1>
        </>
      )
    } else {
      return (
        <>
        <h1>Welcome.</h1>
        </>
      )
    }
  }
}


export default withFirestore(Home);