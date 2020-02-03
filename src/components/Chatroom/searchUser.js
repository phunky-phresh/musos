import React, { Component } from 'react';
import { withAuthorization } from '../Session/session';
import { withAuth } from '../Session/session-context';
import Select from 'react-select';

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundUsers: [],
      selectSearch:null,
      username: null,
      email: null,
      phone: null,
      address: null,
      threadCheck: null
    }
    console.log(props);
    
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

  componentDidUpdate(prevProps, prevState) {
    console.log('props', prevProps);
    console.log('state', prevState);
    console.log('jelly', this.props.search);
    
    
    if (this.props.search !== prevProps.search) {
      console.log('different');
      this.setState({selectSearch: this.props.search})
      
    }
    
  }

  _handleChange = (selectSearch) => {
    console.log(selectSearch);
    // this.props.setActive
    this.setState(
      { selectSearch }
    );
    // const currentUserId = localStorage.uid;
    // const profileUserId = selectSearch.value;
    // const db = this.props.firebase.db;
    // const thread1 = currentUserId + profileUserId
    // const thread2 = profileUserId + currentUserId
    // const threadCheck = db.collection('chatRooms');

    // threadCheck.get().then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       if (doc.id === thread1 || doc.id === thread2) {
    //         this.setState({threadCheck: doc.id})
    //         console.log('checked');
            
    //       }
    //     })
    //   })
  }
  _handleSearch = (event) => {

    event.preventDefault();
    // this.props.history.push(`/profile/${ this.state.selectSearch.value }`)

    // const uid = this.state.selectSearch.value
    // const db = this.props.firebase.db;
    // const user = db.collection('users').doc(uid)

    // user.get().then(response => {
    //   this.setState({
    //     username: response.data().username,
    //     email: response.data().email,
    //     phone: response.data().phone,
    //     address: response.data().address
    //   })
    //   this.props.onSearch(this.state);
    // })

    this.setState({
      selectSearch: null
    });
    const db = this.props.firebase.db;
    const currentUserId = localStorage.uid;
    const currentUsername = localStorage.username;
    const profileUserId = this.state.selectSearch.value;
    const profileUsername = this.state.selectSearch.label;
    const mThreadId = currentUserId + profileUserId;
    if (!this.state.threadCheck) {
      db.collection('chatRooms').doc(mThreadId).set({
        users: [
          {uid: currentUserId, username: currentUsername},
          {uid: profileUserId, username: profileUsername}
        ],
        messages: [],
        id: `${currentUserId+profileUserId}`,
        time: new Date()
      })
      // this.props.history.push(`/thread/${ mThreadId }`)
      
      
    } 
    // console.log('yup');
  }

  render() {
    const users = this.state.foundUsers;
    const filter = users.filter(user =>
      user.id !== localStorage.uid
    );
    const options = filter.map(user => {

        return {
          value: user.id,
          label: user.username
        }
    })

    const isInvalid = this.state.selectSearch === null;

    const { selectSearch } = this.state
    return(

        <form onSubmit={this._handleSearch}>
          <div  className="dropdown-search">
            <Select
              name='search'
              value={selectSearch}
              // onClick={this.props.setActive}
              onChange={this.props.setActive}
              options={options}
              placeholder={"Select user to search"}
              autoFocus
              required
            />
          </div>
        <button>search</button>
        </form>
      
    )
  }
}
  // <Button type="submit" className="search-button" size="m" block disabled={isInvalid} variant="outline-primary">search</Button>
const condition = authUser => !!authUser;

export default withAuth(withAuthorization(condition)(SearchUser));
