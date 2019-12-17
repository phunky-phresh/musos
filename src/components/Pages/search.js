import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
// import Feed from './feed';
// import Profile from './profile';
import SearchBar from '../searchUser';

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user:null,
      feed: true
    }
  }
  _handleSearchUser = (user) => {
    this.setState({ user });
    this.setState({ feed: false })
  }

  render() {
    const feed = this.state.feed
    // console.log(user);
    // const showFeed = (!user === null)
    // <Profile
    //   user={this.state.user}
    // />

      return(
        <div>
        <SearchBar
          onSearch={this._handleSearchUser}
        />
        </div>
      );
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
