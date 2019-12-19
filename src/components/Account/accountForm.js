import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session/session';

import { withAuth } from '../Session/session-context';

import {Form, Button} from 'react-bootstrap';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _returnAccount = () => {
    const db = this.props.firebase.db
    const uid = localStorage.uid
    db.collection('users').doc(uid).set({
      email: this.props.authUser.email,
      username: this.state.username,
      about: this.state.about,
      location: this.state.location,
      media: this.state.media
    }).then(
    console.log('it worked'))

    this.props.view()
  }

  componentDidMount() {
    const db = this.props.firebase.db
    const uid = localStorage.uid

    db.collection('users').doc(uid).get().then(response => {
      let user = response.data();
      this.setState({...user})
    })
  }

  _handleChange = (e) => {
    this.setState({ [ e.target.name ]: e.target.value });
  }

  render() {
    const {
      username,
      about,
      location,
      media
    } = this.state;
    
    if (!this.state) {
      return ''
    }
    return(
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              name ="username"
              value={username}
              type="text"
              onChange={this._handleChange}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>About: </Form.Label>
            <Form.Control
              name="about"
              value={about}
              type="text"
              as="textarea"
              onChange={this._handleChange}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location: </Form.Label>
            <Form.Control
              name="location"
              value={location}
              type="text"
              onChange={this._handleChange}
             >
             </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Media: </Form.Label>
            <Form.Control
              name="media"
              value={media}
              type="text"
              onChange={this._handleChange}
            >
            </Form.Control>
          </Form.Group>
          <Button onClick={this._returnAccount}>Save</Button>
        </Form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(AccountForm))
