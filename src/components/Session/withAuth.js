import React from 'react';

import { withFirebase } from '../Firebase/fireIndex';
import { AuthUserContext } from './session.js';


const withAuthentication = InnerComponent => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      console.log(props);
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged( authUser => {
        authUser
          ? this.setState( { authUser } )
          : this.setState( { authUser: null } );
      })
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <InnerComponent {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withFirebase(WithAuthentication);
}

export default withAuthentication;
