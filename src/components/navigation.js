import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from './Session/session';
import SignOutButton from './Sign/signout';
import * as ROUTES from '../constants/routes';
// import SearchBar from './searchUser';


//bootstrap/////
import {Navbar, Nav, Button} from 'react-bootstrap';
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
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav>
          <Link className="nav-link" to={ROUTES.FEED}>Feed</Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to={ROUTES.ADMIN}>Admin</Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to={ROUTES.CHAT_ROOM}>Chat</Link>
        </Nav>
      </Nav>

        <SignOutButton />

    </Navbar>

  </div>
);

const NavigationNonAuth = () => (
  <div>
  <Navbar bg="dark" variant="dark">
    <Nav>
      <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
    </Nav>
    <Nav>
      <Link className="nav-link" to={ROUTES.LANDING}>Landing</Link>
    </Nav>
  </Navbar>
  </div>
);

export default Navigation;
