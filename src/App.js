import React from "react";
import Navbar from "./components/Navbar";
import Journal from "./components/Journal";
import Signin from "./components/Signin";
import Lessons from "./components/Lessons";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(){
  return ( 
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/journal">
          <Journal />
        </Route>
        <Route path="/lessons">
          <Lessons />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;