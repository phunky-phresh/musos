import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import * as firebase from 'firebase'

import { Form, Button } from 'react-bootstrap';


class Thread extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      messageList: []
    }
  }

  componentDidMount() {
    const db = this.props.firebase.db;
    const threadId = this.props.match.params.threadId
    db.collection('chatRooms').doc(threadId).onSnapshot(response => {
      if (response.data().messages !== null) {
        this.setState({messageList: response.data().messages})
      }
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
      from: this.props.authUser.uid,
      text: this.state.text
    }
    const thread = db.collection('chatRooms').doc(threadId)
    thread.update({
      messages: firebase.firestore.FieldValue.arrayUnion(newText)
    })

  }

  render() {
    return(
      <div>
        <h1>thread</h1>
        <MessageList list={this.state.messageList}/>
        <Form onSubmit={this._handleSubmit}>
          <input onInput={ this._handleInput } type="text" />
          <Button type="submit">Send</Button>
        </Form>
      </div>
    )
  }

}

const MessageList = (props) => {
  const messageList = props.list
  const messages = messageList.map(m => {
    return <p>{m.text}</p>
  })
  return(
    <div>
    <h1>list</h1>
      {messages}
    </div>
  )
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(Thread));
