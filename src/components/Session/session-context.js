import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;

export const withAuth = Component => props =>  ( //HOC alternative
  <AuthUserContext.Consumer>
    {user => <Component {...props} authUser={user} />}
  </AuthUserContext.Consumer>
);
