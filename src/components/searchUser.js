import React, { Component } from 'react';
import { withAuthorization } from './Session/session';
import { withAuth } from './Session/session-context';
import Select from 'react-select';
import {Button} from 'react-bootstrap';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      foundUsers: [],
      selectSearch: null,
      username: null,
      email: null,
      phone: null,
      address: null
    }
  }

  componentDidMount() {
    const db = this.props.firebase.db;
    const users = db.collection('users')
    const foundUsers = [...this.state.foundUsers];
    users.get().then((response) => {
      response.forEach( u => foundUsers.push({...u.data(), id: u.id}))
      this.setState({foundUsers: foundUsers})
    });
  }

  _handeChange = (selectSearch) => {
    this.setState(
      { selectSearch }
    );
  }
  _handleSearch = (event) => {

    event.preventDefault();
    this.props.history.push(`/profile/${ this.state.selectSearch.value }`)

    const uid = this.state.selectSearch.value
    const db = this.props.firebase.db;
    const user = db.collection('users').doc(uid)

    user.get().then(response => {
      this.setState({
        username: response.data().username,
        email: response.data().email,
        phone: response.data().phone,
        address: response.data().address
      })
      this.props.onSearch(this.state);
    })

    this.setState({
      selectSearch: null
    });
  }

  render() {
    const users = this.state.foundUsers;
    const options = users.map(user => {
      return {
        value: user.id,
        label: user.username
      }
    })

    const isInvalid = this.state.selectSearch === null;

    const { selectSearch } = this.state
    return(
      <div >
        <form className="search-bar" onSubmit={this._handleSearch}>
          <div className="dropdown-search">
            <Select
              name='search'
              value={selectSearch}
              onChange={this._handeChange}
              options={options}
              placeholder={"Select user to search"}
              autoFocus
              required
            />
          </div>
          <Button type="submit" className="search-button" size="m" block disabled={isInvalid} variant="outline-primary">search</Button>
        </form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(SearchUser));
