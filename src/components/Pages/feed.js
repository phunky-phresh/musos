import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';

class Feed extends Component {
  constructor(props) {
    super(props)

  }

  // componentDidMount() {
  //   const db = this.props.firebase.db;
  //   const currentUser = this.props.authUser.uid;
  //   // let username = '';
  //
  //   db.collection('users').doc(currentUser).get().then(response => {
  //     let username = response.data().username;
  //     console.log(username);
  //     localStorage.setItem('username', username)
  //   })



  // }
  render() {
    return(
      <h1>Feed coming soon</h1>
    )
  }

}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Feed));
