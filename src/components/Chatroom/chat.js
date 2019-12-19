import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import { Link } from 'react-router-dom';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {threads:null};
  }

  _handleSubmit = (event) => {
    event.preventDefault();
  }
  componentDidMount() {
    const currentUser = this.props.authUser.uid;
    const db = this.props.firebase.db;
    const returnedThreads = [];
    db.collection('chatRooms').get().then(response => {
      response.forEach( thread => {
          if (currentUser === thread.data().users[0].uid || currentUser === thread.data().users[1].uid) {
            returnedThreads.push(thread.data());
          }


      })
      this.setState({threads: returnedThreads})

    })
  }
  _handleSeen = (e) => {
    const db = this.props.firebase.db;
    const threadId = e.target.getAttribute('value');
    db.collection('chatRooms').doc(threadId).update({
      seen: true
    })
  }

  render() {
    if(!this.state.threads) {
      return '';
    }
    return(
      <ThreadList
        list={this.state.threads}
        link={this.props.history}
        user={this.props.authUser}
        request={this.props.firebase}
        seen={this._handleSeen}
      />
    )
  }
}

const ThreadList = (props) => {
  if (!props.list) {
    return '';
  }
  const threadList = props.list;
  //for db request
  const currentUser = props.user.uid


    const threads = threadList.map(t => {
      const threadLink = t.users[0].uid + t.users[1].uid;
      const user1 = t.users[0].uid;
      let user1name = ''
      const user2 = t.users[1].uid;
      let notificationClass = 'thread'
      if (currentUser !== user2) {
        user1name = t.users[1].username
      } else {
        user1name = t.users[0].username
      }
      if (t.seen !== true) {
        notificationClass = 'thread notification'
      }

        return <Link   onClick={props.seen}  key={threadLink} to={`/thread/${ threadLink }`}>
        <div

          className={notificationClass}

          >
          <h4 value={threadLink} >{user1name}</h4>
        </div>
        </Link>


      // console.log(chatWith);

    })

  return (
    <div>
      <h1>Messages</h1>
      {threads}

    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(ChatRoom));
