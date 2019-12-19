import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase/fireIndex';
import { SignUpLink } from './signup';
import { PasswordForgetLink } from '../Account/pwordforget';

import { Form, Button, Row } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

  }

  _handleOnChange = (event) => {
    this.setState( { [event.target.name]: event.target.value } );
  }

  _handleOnSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .signInUserEAP(email, password).then(() => {
        this.setState( { ...INITIAL_STATE } );
        this.props.history.push(ROUTES.SEARCH);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid = password === '' || email === '';

    return(
      <Form onSubmit={this._handleOnSubmit}>
        <Form.Group>
          <Form.Control
            name="email"
            value={email}
            onChange={this._handleOnChange}
            type="text"
            placeholder="Email Address"
          >
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="password"
            value={password}
            onChange={this._handleOnChange}
            type="password"
            placeholder="Enter Password"
          >
          </Form.Control>
        </Form.Group>
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
};

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export { SignInForm };

export default SignInPage;
