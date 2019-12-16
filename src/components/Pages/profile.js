import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import SearchBar from '../searchUser';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props.user);
    // console.log(props);
  }

  // componentDidMount() {
  //   console.log('mount');
  // }



  render() {
    // <h1>Profile coming soon</h1>
    // <h1>{this.props.user.username}</h1>
    // <h1>Email: {this.props.user.email}</h1>
    // <h1>Mobile: {this.props.user.phone}</h1>
    // <h1>Address: {this.props.user.address}</h1>
    if (!this.props.user) {
      return '';
    }
    return(
      <div>
        <h1>Profile</h1>
        <h1>{this.props.user.username}</h1>

      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Profile));
