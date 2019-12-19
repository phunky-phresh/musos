import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import AccountForm from './accountForm';
import { PasswordForgetForm } from './pwordforget';
import PasswordChangeForm from './pwordchange';

import { Button, Row, Container } from 'react-bootstrap';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    }
    console.log(this.state.view);
  }

  _populateState = () => {
    const db = this.props.firebase.db
    const uid = localStorage.uid
    const user = db.collection('users').doc(uid)
    user.get().then((response) => {
      let state = response.data()
      this.setState({ ...state });
    })
  }
  componentDidMount() {
    this._populateState()
  }
  // componentDidUpdate(prevProps) {
  //   console.log(prevProps);
  // }

  _handleViewReset = () => {
    this.setState({view: ''})
    this._populateState();
  }
  _handleFormView = () => {
    this.setState({view: 'form'})
  }
  _handleSetView = () => {
    this.setState({view: 'settings'})
    console.log('set');
  }
  render() {
    let view = this.state.view
    if (view === 'form') {
      return(
        <AccountForm view={this._handleViewReset}/>
      )
    } else if (view === 'settings') {
      return(
        <Settings />
      )
    } else {
      return(
        <div>


          <h1>{this.state.username}</h1>


          <h2>Email:</h2>
            <p>{this.state.email}</p>

          <h2>About:</h2>
            <p>{this.state.about}</p>

          <h2>Location:</h2>
            <p>{this.state.location}</p>
          
          <Button onClick={this._handleFormView}>Update Account Detail</Button>
          <Button onClick={this._handleSetView}>Password Settings</Button>

        </div>
      )
    }
  }
}

const Settings = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <Button>back</Button>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(AccountPage));
