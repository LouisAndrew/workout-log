import React, { FC } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { useAuth } from '@h/useAuth';

// https://reactrouter.com/web/example/auth-workflow
const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route {...rest}>
      {user ? children : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  );
};

export default PrivateRoute;
