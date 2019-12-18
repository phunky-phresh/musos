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
    this.state = {
      user: null,
      currentUsername: localStorage.username,
      existingThread: null
    }
    // console.log(this.state.currentUsername);
 }

  _populateProfile = () => {
    const uid = this.props.match.params.username;
    const db = this.props.firebase.db;
    const user = db.collection('users').doc(uid);

    user.get().then(response => {
      this.setState({user: response.data()})
    })
  }

  componentDidMount(){
    this._populateProfile();
    const currentUserId = localStorage.uid;
    const profileUserId = this.props.match.params.username;
    const db = this.props.firebase.db;
    const thread1 = currentUserId + profileUserId
    const thread2 = profileUserId + currentUserId
    const threadCheck = db.collection('chatRooms');

    threadCheck.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === thread1 || doc.id === thread2) {
            this.setState({existingThread: doc.id})
          }
        })
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
    if (!this.state.existingThread) {
      db.collection('chatRooms').doc(mThreadId).set({
        users: [
          {uid: currentUserId, username: currentUsername},
          {uid: profileUserId, username: profileUsername}
        ],
        messages: []
      }).then(() =>{
        console.log("it worked");
      })
      this.props.history.push(`/thread/${ mThreadId }`)
    } else {
      this.props.history.push(`/thread/${ this.state.existingThread }`)
    }

  }


  render() {
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
