import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase/fireIndex';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  };

  _handleOnChange = (event) => {
    this.setState( {[event.target.name]: event.target.value} );
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    this.props.firebase.doPasswordReset(email).then(() => {
      this.setState( { ...INITIAL_STATE } );
    }).catch( error => {
      this.setState( { error } );
    });
  }

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';
    return(
      <form onSubmit={this._handleSubmit}>
        <input
        name="email"
        value={email}
        onChange={this._handleOnChange}
        type="text"
        placeholder="Email Address"
        />
        <button disabled={isInvalid} type="sumbmit">
          Reset Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);


const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
