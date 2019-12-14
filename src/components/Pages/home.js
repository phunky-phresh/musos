import React from 'react';
import { withAuthorization } from '../Session/session';



const HomePage = () => (
  <div>
    <h1>HomePage coming Soon!</h1>
    <p>The home page is accessible to every signed in user</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
