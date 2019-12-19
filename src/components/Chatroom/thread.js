import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import * as firebase from 'firebase'

import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
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
    if (!threadId) {
      return '';
    }
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
    db.collection('chatRooms').doc(threadId).update({
      seen: false
    }).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log('fail', error);
    })
    this.setState({text: ''});

  }

  _newMessage = () => {
    let container = document.querySelector('.container');
    // container.scrollTo(0,container.scrollHeight);
    if (!container) {
      return;
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

      return <div className={position}key={time.toDate()}><p>{m.text}</p><p className="time">{correct}</p></div>
    })



    return(
      <div>
        <div className="container">
        {messages}
        </div>
        <Form onSubmit={this._handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Type message..."
              aria-label="Message field"
              aria-describedby="basic-addon2"
              onChange={ this._handleInput }
              value={this.state.text}
            />
            <InputGroup.Append>
              <Button type="submit" variant="outline-primary">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    )
  }

}


const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Thread));
