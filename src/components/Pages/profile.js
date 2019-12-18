import React, { Component } from 'react';
  import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
// import SearchBar from '../searchUser';
import { Button } from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import * as ROUTES from '../../constants/routes'

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user:null,
      currentUsername: null
    }
 }

  _populateProfile = () => {
    const uid = this.props.match.params.username;
    const db = this.props.firebase.db;
    const user = db.collection('users').doc(uid);

    user.get().then(response => {
      console.log(response.data());
      this.setState({user: response.data()})
    })
  }

  componentDidMount(){
    this._populateProfile();
    const currentUserId = this.props.authUser.uid;
    const db = this.props.firebase.db;
    const user = db.collection('users').doc(currentUserId);

    user.get().then(response => {
      // console.log(response.data().username);
      this.setState({currentUsername: response.data().username})
    })

  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this._populateProfile();
    }
  }

  _handleMessageClick = () => {
    const db = this.props.firebase.db;
    const currentUserId = this.props.authUser.uid;
    const currentUsername = this.state.currentUsername;
    const profileUserId = this.props.match.params.username;
    const profileUsername = this.state.user.username;
    const mThreadId = currentUserId + profileUserId;

    db.collection('chatRooms').doc(mThreadId).set({
      users: [
        {uid: currentUserId, username: currentUsername},
        {uid: profileUserId,username: profileUsername}
      ],
      messages: []
    }).then(() =>{
      console.log("it worked");
    })
    this.props.history.push(`/thread/${ mThreadId }`)
  }


  render() {
    // <h1>Profile coming soon</h1>
    // <h1>{this.props.user.username}</h1>
    // <h1>Email: {this.props.user.email}</h1>
    // <h1>Mobile: {this.props.user.phone}</h1>
    // <h1>Address: {this.props.user.address}</h1>
    if (!this.state.user) {
      return '';
    }
    return(
      <div>
        <h1>Profile</h1>
        <h1>{this.state.user.username}</h1>

        <Button onClick={this._handleMessageClick}>Message</Button>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Profile));
