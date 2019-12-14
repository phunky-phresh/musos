import React from 'react';
import { withAuthorization } from '../Session/session';


import { PasswordForgetForm } from './pwordforget';
import PasswordChangeForm from './pwordchange';

const AccountPage = () => (
  <div>
    <h1>Account</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
