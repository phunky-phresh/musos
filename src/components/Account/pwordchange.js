import React, { Component } from 'react';
import { withFirebase } from '../Firebase/fireIndex';

const INITIAL_STATE = {
  password1: '',
  password2: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super();
    this.state = {
      ...INITIAL_STATE
    };
  }

  _handleOnChange = (event) => {
    this.setState( { [event.target.name]: event.target.value } );
  }
  _handleSubmit = (event) => {
    event.preventDefault();
    const { password1 } = this.state;

    this.props.firebase.doPasswordUpdate(password1).then(() => {
      this.setState( { ...INITIAL_STATE } );
    }).catch(error => {
      this.setState( { error } );
    });
  };

  render() {
    const { password1, password2, error } = this.state;

    const isInvalid = password1 !== password2 || password1 === '';
    return(
      <form>
        <input
          name='password1'
          value={password1}
          onChange={this._handleOnChange}
          type='password'
          placeholder="New Password"
        />
        <input
          name='password2'
          value={password2}
          onChange={this._handleOnChange}
          type='password'
          placeholder='Confirm New Password'
        />

        <button disabled={isInvalid} type='submit'>
          Reset Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withFirebase(PasswordChangeForm);
