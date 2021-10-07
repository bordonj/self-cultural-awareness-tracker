import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoaded, sLoaded, withFirestore } from "react-redux-firebase";


function Navbar({ firebase, currUser }){
  const [currentUser, setCurrentUser] = useState();
  const auth = firebase.auth();
  console.log(auth.currentUser)
  console.log(auth);
  console.log(currUser);


  useEffect(() => {
    setInterval(() => {
      const user = localStorage.getItem("user");
      setCurrentUser(user);
      }, [])
  }, 5000);

  function doSignOut() {
    firebase.auth().signOut().then(() => {
      console.log('successfully signout!');
      localStorage.clear();
    }).catch(error => {
      console.log(error.message);
    });
  }

  if (typeof currentUser === 'string') {
  console.log(typeof currentUser)
  return (
    <div className="ui secondary pointing menu" id="navbar">
      <Link to="/" className="item">Home</Link>
      <Link to="/journal" className="item">Journal</Link>
      <Link to="/lessons" className="item">Lessons</Link>
      <Link to="/profile" className="item">Profile</Link>
      <Link user={currentUser} to="/signin" className="item right">{currentUser}</Link>
    </div>
  );
  } else {
  return (
    <>
    {console.log('not logged in')}
    <div className="ui secondary pointing menu" id="navbar">
      <Link to="/" className="item">Home</Link>
      <Link to="/journal" className="item">Journal</Link>
      <Link to="/lessons" className="item">Lessons</Link>
      <Link to="/signin" className="item right">Register/Sign In</Link>
    </div>
    {/* <hr/> */}
    </>
  );
  }
}

export default withFirestore(Navbar);