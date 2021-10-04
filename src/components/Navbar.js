import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const HelpQueueNavbar = styled.h1`
  font-size: 24px;
  text-align: center;
  color: white;
  background-color: black;
`;
const StyledWrapper = styled.section`
  background-color: orange;
`;
function Navbar(){
  return (
    <React.Fragment>
      <StyledWrapper>
        <HelpQueueNavbar>
          Help Queue
        </HelpQueueNavbar>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/journal">Journal</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/lessons">Lessons</Link>
          </li>
        </ul>
      </StyledWrapper>
    </React.Fragment>
  );
}

export default Navbar;