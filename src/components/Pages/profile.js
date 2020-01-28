import React, { Component } from 'react';
  import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
// import SearchBar from '../searchUser';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
    const currentUserId = localStorage.uid;
    const currentUsername = localStorage.username;
    const profileUserId = this.props.match.params.username;
    const profileUsername = this.state.user.username;
    const mThreadId = currentUserId + profileUserId;
    if (!this.state.existingThread) {
      db.collection('chatRooms').doc(mThreadId).set({
        users: [
          {uid: currentUserId, username: currentUsername},
          {uid: profileUserId, username: profileUsername}
        ],
        messages: [],
        id: `${currentUserId+profileUserId}`,
        time: new Date()
      })
      // this.props.history.push(`/thread/${ mThreadId }`)
      console.log('sucess');
      
    } 
    // else {
    //   this.props.history.push(`/thread/${ this.state.existingThread }`)
    // }

  }


  render() {
    if (!this.state.user) {
      return '';
    }
    return(
      <div>

        <h1>{this.state.user.username}</h1>
        <Link to={'/chat-room'} size="sm" onClick={this._handleMessageClick}>Message</Link>
        <h3>Email:</h3>
          <p>{this.state.user.email}</p>

        <h3>About:</h3>
          <p>{this.state.user.about}</p>

        <h3>Location:</h3>
          <p>{this.state.user.location}</p>
        <h3>Media:</h3>
          <p><Link href={this.state.user.media} >{this.state.user.media}</Link></p>

      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Profile));
