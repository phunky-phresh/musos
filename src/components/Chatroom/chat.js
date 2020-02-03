import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import Thread from './thread';
import Search from './searchUser';


class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads:null,
      active:null,
      check: null,
      view: null,
      selectSearch: null,
      threadCheck: null
    };
  }

  _handleChange = (selectSearch) => {
    console.log(selectSearch);
    
    this.setState(
      { selectSearch }
    );
    const currentUserId = localStorage.uid;
    const profileUserId = selectSearch.value;
    const db = this.props.firebase.db;
    const thread1 = currentUserId + profileUserId
    const thread2 = profileUserId + currentUserId
    const threadCheck = db.collection('chatRooms');

    threadCheck.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === thread1 || doc.id === thread2) {
            this.setState({
              threadCheck: doc.id,
              active: doc.id
            })
            console.log('checked');
            
          }
        })
      })
  }

  _setActiveThread = (e) => {
    const threadId = e.target.getAttribute('value');
    // e.target.classList.remove('notification');

    this.setState({
      active: threadId,
      // view: 'active'
    })
  }
  // _searchSetThread = (event) => {
  //   // event.preventDefault();
  //   console.log(event);
  //   const threadId = event.target.getAttribute('value');
  //   // event.target

  //   this.setState({
  //     active: threadId
  //   })
  // }

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
      let sortedList = returnedThreads.sort((a,b) => {
        return (b.time).toDate() - (a.time).toDate();
      })
      let firstMessage;
      if (sortedList.length >= 1) {
        firstMessage = sortedList[0].id;
      }
      
      this.setState({
        threads: sortedList,
        active: firstMessage
      })
      
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
    if (this.state.view === null) {
      return(
        <div className="wrap">
        
        <ThreadList
          list={this.state.threads}
          link={this.props.history}
          user={this.props.authUser}
          request={this.props.firebase}
          seen={this._handleSeen}
          setActive={this._setActiveThread}
          active={this.state.active}
          searchThread={this._handleChange}
          select={this.state.selectSearch}
        />
       
        <Thread 
          active={this.state.active}
        />
      </div>
      )
    }
    else {
      return(
        <div className="wrap">
        <Thread
          active={this.state.active}
        />
        </div>
      )
    }

  }
}

const ThreadList = (props) => {
  console.log(props);
  
  if (!props.list) {

    return '';
  }
  const threadList = props.list;
  //for db request
  const currentUser = props.user.uid


    let threads = threadList.map(t => {
      const threadLink = t.users[0].uid + t.users[1].uid;
      const user1 = t.users[0].uid;
      let user1name = ''
      const user2 = t.users[1].uid;
      let notificationClass = 'thread'
      let timeStamp = t.time;
      
      if (currentUser !== user2) {
        user1name = t.users[1].username
      } else {
        user1name = t.users[0].username
      }
      if (t.seen !== true) {
        notificationClass = 'thread notification'
      }
      if (threadLink === props.active) {
        notificationClass = 'active';
        
      }

        return <a onClick={props.seen} className="thread-link" key={threadLink} >
        <div onClick={props.setActive} value={threadLink}  className={notificationClass}>
          <h4 value={threadLink} >{user1name}</h4>
        </div>
        </a>
    })
    
 
  return (
    <div className="two">
      <Search 
        setActive={props.searchThread}
        search={props.select}
      />
      {threads}
    </div>
  )
}


const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(ChatRoom));
