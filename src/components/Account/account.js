import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';

import { PasswordForgetForm } from './pwordforget';
import PasswordChangeForm from './pwordchange';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.authUser.uid,
      username: null,
      email: null,
      phone: null,
      address: null
    }
  }

  componentDidMount() {
    const db = this.props.firebase.db
    const user = db.collection('users').doc(this.state.currentUser)
    user.get().then((response) => {
      this.setState({
        username: response.data().username,
        email: response.data().email,
        phone: response.data().phone,
        address: response.data().address
      });
    })

    // users.get().then((response) => {
    //   response.forEach( u => console.log(u.data()))
    // })
  }

  render() {
    // this.setState({
    //   this.state
    // })
    return(
      <div>
      <h1>{this.state.username}</h1>
      <h1>Email: {this.state.email}</h1>
      <h1>Mobile: {this.state.phone}</h1>
      <h1>Address: {this.state.address}</h1>
        <AccountDetails />
      </div>
    )
  }
}

const AccountDetails = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(AccountPage));
