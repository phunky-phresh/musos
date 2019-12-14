import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { withFirebase } from './components/Firebase/fireIndex';
//Route Imports
import Navigation from './components/navigation';
import LandingPage from './components/Pages/landing';
import SignUpPage from './components/Sign/signup';
import SignInPage from './components/Sign/signin';
import PasswordForgetPage from './components/Account/pwordforget';
import HomePage from './components/Pages/home';
import AccountPage from './components/Account/account';
import AdminPage from './components/admin';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged( authUser => {
      authUser
        ? this.setState( { authUser } )
        : this.setState( { authUser: null } );
    })
  }

  render() {
    return (
        <Router>
          <div>
            <Navigation authUser={this.state.authUser} />

            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </div>
        </Router>
    );
  }

}

export default withFirebase(App);
