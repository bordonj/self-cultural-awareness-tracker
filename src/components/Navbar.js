import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  console.log(currentUser);

  return ( 
    <Navbar collapseOnSelect expand="lg" className="navbar">
        <Navbar.Brand id="header">Know Myself</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!currentUser && 
            <>
              <div className="login">
                <Link to="/login" className="link">Login <i class="bi bi-door-open-fill"></i></Link>
                <Link to="/signup" className="link">Sign Up</Link>
              </div>
            </>
          }
          {currentUser && 
            <>
              <div className="links">
                <Link to="/" className="link">Home</Link>
                <Link to="/entries" className="link">Blogs</Link>
                <Link to="/create" className="link">New Blog</Link>
                <Link to="/lessons" className="link">Lessons</Link>
              </div>
              <div className="login">
                <Link to="/login" onClick={logout} className="link">Logout <i class="bi bi-door-closed-fill"></i></Link>
                <Link to="/profile" className="link">{currentUser.email} <i class="bi bi-person-circle"></i></Link>
              </div>
            </>
          }
        </Navbar.Collapse>
        

    </Navbar>
  );
}

export default NavBar;