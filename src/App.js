import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/create" component={Create}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
