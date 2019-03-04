import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppConsumer } from './contexts/AppContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AppConsumer>
    {({ isLoggedIn }) => (
      <Route
        render={
          props =>
            isLoggedIn
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        {...rest}
      />
    )}
  </AppConsumer>
);

export default ProtectedRoute;
