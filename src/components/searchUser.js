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
    console.log(this.state.selectSearch.label);
    this.props.history.push(`/profile/${ this.state.selectSearch.value }`)
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
