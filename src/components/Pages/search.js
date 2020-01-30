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
  componentDidMount() {
    const db = this.props.firebase.db;
    const currentUser = this.props.authUser.uid;
    console.log(currentUser);
    
    let username;

    db.collection('users').doc(currentUser).get().then(response => {
      username = response.data().username;
      console.log(username);
      
      localStorage.setItem('username', username)
      localStorage.setItem('uid', currentUser)
    })
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
        {/* <SearchBar
          onSearch={this._handleSearchUser}
        /> */}
        </div>
      );
  }
}


const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(HomePage));
