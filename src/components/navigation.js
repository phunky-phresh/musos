import React, { Component } from 'react';
import { withAuthorization } from './Session/session';
import { withAuth } from './Session/session-context';

import { Link } from 'react-router-dom';
import { AuthUserContext } from './Session/session';
import SignOutButton from './Sign/signout';
import * as ROUTES from '../constants/routes';
import './navigation.css'
//bootstrap/////
import {Navbar, Nav} from 'react-bootstrap';

const Navigation = (props) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth props={props}/> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
)

//Different navs based on sign in or not
class NavigationAuth extends Component {
  constructor(props) {
    super(props);
    this.state ={
      notification: false,
      chatClass: 'nav-link',
      logged: false
    }
    console.log(props);
    const db = props.props.firebase.db
    console.log(db);
    db.collection("chatRooms").onSnapshot((doc) => {
        if (this.state.logged === false) {
          this.setState({logged: true})
          return;
        }
            doc.docs.forEach( thread => {
            let user1 = thread.data().users[0].uid
            let user2 = thread.data().users[1].uid
            if (localStorage.uid === user1 || localStorage.uid === user2) {
              console.log('match');
              this.setState({notification: true})
            }
          });
          if (this.state.notification === true) {
            console.log('notification');
            this.setState({chatClass: 'nav-link notification'})
          }
      });

  }


    render() {

      return(
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
                <Link className={this.state.chatClass} to={ROUTES.CHAT_ROOM}>Chat</Link>
              </Nav>
            </Nav>

              <SignOutButton />

          </Navbar>
        </div>
      )
    }
  }



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
const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Navigation));
