import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
// import Profile from './profile';
// import SearchBar from '../searchUser';

class HomePage extends Component {
  constructor(props) {
    super(props)
    console.log(props);
  }

  render() {
    return(
      <div>
    

      </div>
    )
  }
}



// const Details = (props) => (
//
//   <div>
//     <h1>HomePage coming Soon!</h1>
//     <p>The home page is accessible to every signed in user</p>
//   </div>
// );

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(HomePage));
