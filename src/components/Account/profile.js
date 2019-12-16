import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      phone: null,
      address: null
    }
    // console.log(props.match.params.username);
  }

  componentDidMount() {
    const uid = this.props.match.params.username
    const db = this.props.firebase.db;
    const user = db.collection('users').doc(uid)

    user.get().then(response => {
      console.log(response.data().username);
      this.setState({
        username: response.data().username,
        email: response.data().email,
        phone: response.data().phone,
        address: response.data().address
      })
    })
  }
  render() {
    return(
      <div>
        <h1>Profile coming soon</h1>
        <h1>{this.state.username}</h1>
        <h1>Email: {this.state.email}</h1>
        <h1>Mobile: {this.state.phone}</h1>
        <h1>Address: {this.state.address}</h1>

      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Profile));
