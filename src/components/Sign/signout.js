import React from 'react';
import { withFirebase } from '../Firebase/fireIndex';
import { Button } from 'react-bootstrap';


const SignOutButton = ( { firebase } ) => (
  <Button variant="outline-info" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
