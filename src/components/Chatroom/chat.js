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
    // const threadId = this.props.match.params.threadId
    db.collection('chatRooms').get().then(response => {
      response.forEach( thread => {
          if (currentUser === thread.data().users[0].uid || currentUser === thread.data().users[1].uid) {
            returnedThreads.push(thread.data());
          }


      })
      this.setState({threads: returnedThreads})

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

      if (currentUser !== user2) {
        user1name = t.users[1].username
      } else {
        user1name = t.users[0].username
      }

        return <Link to={`/thread/${ threadLink }`}><div className="thread" key={2}>{user1name}</div></Link>


      // console.log(chatWith);

    })

  return (
    <div>
      <h1>Chat room coming soon</h1>
      {threads}

    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(ChatRoom));
