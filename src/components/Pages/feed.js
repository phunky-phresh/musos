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
      <div>
        <h1>Segway Chat App</h1>
        <h3>When you set out to build something and instead build a chat room app.</h3>
      </div>
    )
  }

}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Feed));
