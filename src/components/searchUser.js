import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from './Session/session';
import { withAuth } from './Session/session-context';
import Select from 'react-select';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      foundUsers: [],
      selectSearch: null
    }
  }

  componentDidMount() {
    const db = this.props.firebase.db;
    const users = db.collection('users')
    const foundUsers = [...this.state.foundUsers];
    users.get().then((response) => {
      response.forEach( u => foundUsers.push(u.data()))
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
    this.props.history.push(`/details/${ this.state.username }`)
  }

  render() {
    const users = this.state.foundUsers;
    const options = users.map(user => {
      return {
        value: user.email,
        label: user.username
      }
    })

    const { selectSearch } = this.state
    return(
      <div>
      <form onSubmit={this._handleSearch}>
        <p>search</p>
        <Select
          value={selectSearch}
          onChange={this._handeChange}
          options={options}
          placeholder={"search..."}
          autoFocus
          required
        />
        <button type="submit">search</button>
      </form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(SearchUser));
