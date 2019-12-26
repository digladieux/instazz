import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './component/public-pages/register';
import RecoveryPassword from './component/public-pages/recoveryPassword';
import ChangePassword from './component/public-pages/changePassword';
import Home from './component/public-pages/home';
import Callback from './component/public-pages/callback';
import Account from './component/private-pages/account';
import TrackersFeed from './component/private-pages/trackersFeed';
import { Redirect } from 'react-router-dom'
import PostPost from './component/private-pages/postPost';
import NotFound from './component/public-pages/notFound';
import { getCookie, removeCookie } from './component/cookies';
import SinglePost from './component/private-pages/singlePost';
import SingleGlobeTrotter from './component/private-pages/singleGlobeTrotter';
// import TestForm from './component/form/testForm';
import LocalAuthenticationService from './component/services/authentication/localAuthenticationService';
import Login from './component/public-pages/login';

const localAuthenticationService: LocalAuthenticationService = new LocalAuthenticationService();

async function isUserLogged() {
  const token = getCookie('authorization')
  if (token === undefined) {
    return false;
  }
  const result = await localAuthenticationService.loginByToken(token);
  if (result.status === 200) {
    return true;
  } else {
    removeCookie('authorization');
    return false;
  }

}

function GuardRoute() {
  return function ({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props: JSX.IntrinsicAttributes) => (isUserLogged() ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
  };
}


class App extends React.Component<{}, {}> {
  render() {
    const PrivateRoute = GuardRoute();
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
              <li><Link to={'/account'} className="nav-link">Account</Link></li>
              <li><Link to={'/trackersFeed'} className="nav-link">TrackersFeed</Link></li>
              <li><Link to={'/postPost'} className="nav-link">Create a Post</Link></li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/recoveryPassword' component={RecoveryPassword} />
            <Route path='/changePassword' component={ChangePassword} />
            <PrivateRoute path='/account' component={Account} />
            <PrivateRoute path='/globeTrotter' component={SingleGlobeTrotter} />
            <PrivateRoute path='/trackersFeed' component={TrackersFeed} />
            <PrivateRoute path='/post' component={SinglePost} />
            <Route path='/callback' component={Callback} />
            <Route path='/postPost' component={PostPost} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
