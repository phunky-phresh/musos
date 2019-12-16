import React, { Component } from 'react';

class ChatRoom extends Component {
  constructor() {
    super();
    console.log('this');
  }

  _handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Chat room coming soon</h1>
        <form onSubmit={this._handleSubmit}>
          <input type='text' placeholder="text"/>
          <button>send</button>
        </form>
      </div>
    )
  }
}

export default ChatRoom;
