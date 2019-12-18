import React, { Component } from 'react';
import { withAuthorization } from './Session/session';
import { withAuth } from './Session/session-context';
import Select from 'react-select';

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
      <div>
      <form onSubmit={this._handleSearch}>
        <Select
          name='search'
          value={selectSearch}
          onChange={this._handeChange}
          options={options}
          placeholder={"search..."}
          autoFocus
          required
        />
        <button disabled={isInvalid} type="submit">search</button>
      </form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(SearchUser));
