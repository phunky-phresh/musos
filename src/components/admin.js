import React, { Component } from 'react';

import { withFirebase } from './Firebase/fireIndex';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    }
  }


  render() {
    return(
      <div>
        <h1>Admin</h1>
      </div>
    );
  }
}

export default withFirebase(AdminPage);
