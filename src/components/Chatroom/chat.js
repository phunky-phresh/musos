import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {threads:null};
  }

  _handleSubmit = (event) => {
    event.preventDefault();
  }
  componentDidMount() {
    const currentUser = this.props.authUser.uid;
    console.log(currentUser);
    const db = this.props.firebase.db;

    const returnedThreads = [];
    // const threadId = this.props.match.params.threadId
    db.collection('chatRooms').get().then(response => {
      response.forEach( thread => {
        console.log(thread.data());
          if (currentUser === thread.data().user1 || currentUser === thread.data().user2) {
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
      />
    )
  }
}

const ThreadList = (props) => {
  if (!props.list) {
    return '';
  }
  console.log(props.list);
  const threadList = props.list
  console.log(threadList);
  // const list = thr eadList
    const threads = threadList.map(t => {

      return <p key={t.user2}>{t.user1}</p>

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
