import React from 'react';
import { withFirebase } from '../Firebase/fireIndex';


const SignOutButton = ( { firebase } ) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
