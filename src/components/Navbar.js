import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  console.log(currentUser);

  return ( 
    <nav className="navbar">
      <h1>Know Myself</h1>
      {!currentUser && 
        <>
          <div className="login">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </>
      }
      {currentUser && 
        <>
          <div className="links">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/create">New Blog</Link>
          <Link to="/lessons">Lessons</Link>
          </div>
          <div className="login">
            <Link to="/login" onClick={logout}>Logout</Link>
            <Link to="/profile">Email Placeholder</Link>
          </div>
        </>
      }
      

    </nav>
  );
}

export default Navbar;