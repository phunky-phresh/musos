import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';

class Feed extends Component {
  constructor(props) {
    super(props)

  }





  // }
  render() {
    return(
      <h1>What's that? a chat...app!</h1>
    )
  }

}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Feed));
