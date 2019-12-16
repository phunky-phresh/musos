import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from './Session/session';
import SearchUser from './searchUser';
import SignOutButton from './Sign/signout';
import * as ROUTES from '../constants/routes';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
)

//Different navs based on sign in or not
const NavigationAuth = () => (
  <div>
  <SearchUser />

    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <Link to={ROUTES.CHAT_ROOM}>Chat</Link>
      </li>

      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </div>
);

export default Navigation;
