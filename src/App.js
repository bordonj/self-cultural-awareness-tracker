import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import Journal from "./components/Journal";
import Signin from "./components/Signin";
import Lessons from "./components/Lessons";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState();

  console.log('user', user);

  
  useLayoutEffect(() => {
  // useEffect(() => {
    console.log('app js useeffect');
    setUser(localStorage.getItem("user"));
    console.log('app', user);
    // const loggedInUser = localStorage.getItem("user");
    // console.log('app', loggedInUser);
    // if (loggedInUser) {
    //   console.log(loggedInUser)
    //   const foundUser = loggedInUser
    //   setUser(foundUser);
    // }
  }, []);

  console.log('app user', user)

  return ( 
    <Router>
      <Navbar currUser={user}/>
      <Switch>
        <Route path="/signin">
          {/* <Signin /> */}
          <Signin onUserFound={setUser} />
        </Route>
        <Route path="/journal">
          <Journal />
        </Route>
        <Route path="/lessons">
          <Lessons />
        </Route>
        <Route path="/">
          <Home currUser={user}/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;