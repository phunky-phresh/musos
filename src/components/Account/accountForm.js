import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session/session';

import { withAuth } from '../Session/session-context';

import {Form, Button} from 'react-bootstrap';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {

    }
  }

  _returnAccount = () => {
    this.props.view()
  }

  componentDidMount() {
    console.log('this will collect users existing details');
    const db = this.props.firebase.db
    const uid = localStorage.uid

    db.collection('users').doc(uid).get().then(response => {
      console.log(response.data());
      this.setState({user: response.data()})
    })
  }

  render() {
    console.log(this.props);
    if (!this.state.user) {
      return ''
    }
    return(
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" value={this.state.user.username}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>About: </Form.Label>
            <Form.Control type="text" as="textarea"></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location: </Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Media: </Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>
          <Button onClick={this._returnAccount}>Save</Button>
        </Form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(AccountForm))
