import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from './components/Session/session';
import * as ROUTES from './constants/routes';
//Route Imports
import Navigation from './components/navigation';
import LandingPage from './components/Pages/landing';
import SignUpPage from './components/Sign/signup';
import SignInPage from './components/Sign/signin';
import PasswordForgetPage from './components/Account/pwordforget';
import HomePage from './components/Pages/home';
import AccountPage from './components/Account/account';
import AdminPage from './components/admin';
import ChatRoom from './components/Chatroom/chat';
import Profile from './components/Account/profile';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.CHAT_ROOM} component={ChatRoom} />
      <Route path={ROUTES.PROFILE} component={ Profile } />

    </div>
  </Router>
)



export default withAuthentication(App);
