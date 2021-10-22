import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from 'react-bootstrap';

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
                <Link to="/login" className="link">Login <i className="bi bi-door-open-fill" style={{color: 'white'}}></i></Link>
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
                <Link to="/login" onClick={logout} className="link">Logout <i className="bi bi-door-closed-fill" style={{color: 'white'}}></i></Link>
                <Link to="/profile" className="link">{currentUser.email} <i className="bi bi-person-circle" style={{color: 'white'}}></i></Link>
              </div>
            </>
          }
        </Navbar.Collapse>
        

    </Navbar>
  );
}

export default NavBar;
