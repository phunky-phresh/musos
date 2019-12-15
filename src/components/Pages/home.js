import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';

class HomePage extends Component {
  constructor(props) {
    super(props)
    console.log(props.authUser.uid);
  }

  render() {
    return(
      <div>
      <Details />
        <h1>this</h1>
      </div>
    )
  }
}

const Details = (props) => (

  <div>
    <h1>HomePage coming Soon!</h1>
    <p>The home page is accessible to every signed in user</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(HomePage));
