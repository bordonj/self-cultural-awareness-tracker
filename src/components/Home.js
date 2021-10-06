import React, { useState } from "react";
import { withFirestore, isLoaded } from 'react-redux-firebase';

const Home = (props) => {
  const auth = props.firebase.auth();
  console.log('auth.currentUser', auth.currentUser)
  if(!isLoaded(auth)) {
    return (
      <>
      <h1>Loading...</h1>
      </>
    )
  }
  if ((isLoaded(auth)) && (!auth.currentUser))  {
    return (
      <>
      <h1>You must be signed in to access home page.</h1>
      </>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    return (
      <>
      <h1>welcome {auth.currentUser.email}</h1>
      </>
    )
  }
}

export default withFirestore(Home);