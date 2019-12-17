import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase/fireIndex';

import * as ROUTES from '../../constants/routes';


const INITIAL_STATE = {
  username: '',
  email: '',
  password1: '',
  password2: '',
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...INITIAL_STATE
    };
  }

  _handleOnChange = (event) => {
    this.setState( { [event.target.name]: event.target.value} );
  }
  _handleOnSubmit = (event) => {
    event.preventDefault();
    const { username, email, password1 } = this.state;

    this.props.firebase
      .createUserEAP(email, password1).then( authUser => {
        return this.props.firebase.user(authUser.user.uid).set( {username, email});
      }).then(() =>{
        this.setState( { ...INITIAL_STATE } );
        this.props.history.push(ROUTES.SEARCH);
      }).catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const {
      username,
      email,
      password1,
      password2,
      error,
    } = this.state;

    const isInvalid =
    password1 !== password2 ||
    password1 === '' ||
    email === '' ||
    username === '';

    return(
      <form onSubmit={this._handleOnSubmit}>
        <input
          name="username"
          value={username}
          onChange={this._handleOnChange}
          type="text"
          placeholder="Band Name"
        />
        <input
          name="email"
          value={email}
          onChange={this._handleOnChange}
          type="text"
          placeholder="email address"
        />
        <input
          name="password1"
          value={password1}
          onChange={this._handleOnChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="password2"
          value={password2}
          onChange={this._handleOnChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpPage = () => (
  <div>
    <h1>Sign Up Page</h1>
      <SignUpForm />
  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);


export { SignUpForm, SignUpLink };

export default SignUpPage;
