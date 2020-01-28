import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAuthentication } from './components/Session/session';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import * as ROUTES from './constants/routes';
//Route Imports
import Navigation from './components/navigation';
import SignUpPage from './components/Sign/signup';
import SignInPage from './components/Sign/signin';
import PasswordForgetPage from './components/Account/pwordforget';
import HomePage from './components/Pages/search';
import AccountPage from './components/Account/account';
import AdminPage from './components/admin';
import ChatRoom from './components/Chatroom/chat';
import Thread from './components/Chatroom/thread';
import Profile from './components/Pages/profile';
import Feed from './components/Pages/feed';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <div className="wrapper">
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.SEARCH} component={HomePage} />
      <Route path={ROUTES.FEED} component={Feed} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />

      <Route path={ROUTES.CHAT_ROOM} component={ChatRoom} />
      <Route path={ROUTES.THREAD} component={Thread} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      </div>
    </div>
  </Router>
)



export default withAuthentication(App);
