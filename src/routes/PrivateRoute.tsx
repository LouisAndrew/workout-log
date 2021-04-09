import React, { FC } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  useLocation,
} from 'react-router-dom';
import { useAuth } from '@h/useAuth';

// https://reactrouter.com/web/example/auth-workflow
const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useAuth();
  const { search, pathname } = useLocation();

  return (
    <Route {...rest}>
      {user ? children : <Redirect to={{ pathname: '/login', state: { from: `${pathname}${search}` } }} />}
    </Route>
  );
};

export default PrivateRoute;
