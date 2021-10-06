import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

// const HelpQueueNavbar = styled.h1`
//   font-size: 24px;
//   text-align: center;
//   color: white;
//   background-color: black;
// `;
// const StyledWrapper = styled.section`
//   background-color: orange;
// `;
function Navbar(){
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="link">Home</Link>
      <Link to="/journal" className="link">Journal</Link>
      <Link to="/signin" className="link">Sign In</Link>
      <Link to="/lessons" className="link">Lessons</Link>
    </div>
  );
}

export default Navbar;