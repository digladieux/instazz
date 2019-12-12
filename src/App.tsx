// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import RecoveryPassword from './component/RecoveryPassword';
import ChangePassword from './component/ChangePassword';
import Home from './component/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/register'} className="nav-link">Register</Link></li>
            <li><Link to={'/recoveryPassword'} className="nav-link">RecoveryPassword</Link></li>
            <li><Link to={'/changePassword'} className="nav-link">ChangePassword</Link></li>
            <li><Link to={'/login'} className="nav-link">Login</Link></li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/recoveryPassword' component={RecoveryPassword} />
          <Route path='/changePassword' component={ChangePassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
