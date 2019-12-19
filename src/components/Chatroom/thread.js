import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import * as firebase from 'firebase'

import { Form, Button } from 'react-bootstrap';
import './thread.css';

class Thread extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      currentUsername: localStorage.username,
      messageList: []
    }
  }

  componentDidMount() {
    const db = this.props.firebase.db;
    const threadId = this.props.match.params.threadId
    db.collection('chatRooms').doc(threadId).onSnapshot(response => {
      // if (response.data().messages !== null) {
        this.setState({messageList: response.data().messages})
        this._newMessage();
    })
  }
  _handleInput = (e) => {
    this.setState({text: e.target.value})
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    const db = this.props.firebase.db;
    const threadId = this.props.match.params.threadId
    const newText = {
      time: new Date(),
      from: this.state.currentUsername,
      text: this.state.text
    }
    const thread = db.collection('chatRooms').doc(threadId)
    thread.update({
      messages: firebase.firestore.FieldValue.arrayUnion(newText)
    })
    this.setState({text: ''});

  }

  _newMessage = () => {
    let container = document.querySelector('.container');
    // container.scrollTo(0,container.scrollHeight);
    if (!container) {
      return ''
    }
    container.scrollTop = container.scrollHeight - container.clientHeight;
  }

  render() {
    const db = this.props.firebase.db;
    const messageList = this.state.messageList;
    const messages = messageList.map(m => {
      let time = m.time;
      let realTime = time.toDate() + "";
      let correct = realTime.slice(0, 24)
      let position = "left";
      if (m.from === localStorage.username) {
        position = "right"
      };

      return <div className={position}key={time.toDate()}><h4>from: {m.from}</h4><p>{m.text}</p>{correct}<p></p></div>
    })



    return(
      <div>
        <h1>thread</h1>
        <div className="container">
        {messages}
        </div>
        <Form onSubmit={this._handleSubmit}>
          <input onChange={ this._handleInput } value={this.state.text} type="text" />
          <Button type="submit">Send</Button>
        </Form>
      </div>
    )
  }

}


const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Thread));
