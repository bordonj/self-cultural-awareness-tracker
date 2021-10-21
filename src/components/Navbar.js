import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  const nodeRef = React.useRef(null); 
  const { currentUser, logout } = useAuth();
  console.log(currentUser);

  return ( 
    <Navbar collapseOnSelect expand="lg" className="navbar">
        <Navbar.Brand id="header">Know Myself</Navbar.Brand>
        <Navbar.Toggle animation="false" aria-controls="responsive-navbar-nav" ref={nodeRef}/>
        <Navbar.Collapse animation="false" id="responsive-navbar-nav">
          {!currentUser && 
            <>
              <div className="login" ref={nodeRef}>
                <Link to="/login" className="link">Login</Link>
                <Link to="/signup" className="link">Sign Up</Link>
              </div>
            </>
          }
          {currentUser && 
            <>
              <div className="links" ref={nodeRef}>
                <Link to="/" className="link">Home</Link>
                <Link to="/blogs" className="link">Blogs</Link>
                <Link to="/create" className="link">New Blog</Link>
                <Link to="/lessons" className="link">Lessons</Link>
              </div>
              <div className="login" ref={nodeRef}>
                <Link to="/login" onClick={logout} className="link">Logout</Link>
                <Link to="/profile" className="link">{currentUser.email}</Link>
              </div>
            </>
          }
        </Navbar.Collapse>
        

    </Navbar>
  );
}

export default NavBar;