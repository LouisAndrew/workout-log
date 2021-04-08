import React, { useEffect } from 'react';
import {
  Switch, Route, useHistory, useLocation
} from 'react-router-dom';
import { Dashboard } from '@r/Dashboard';
import { Login } from '@r/Login';
import { PrivateRoute, R } from '@r/index';

function App() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      history.push(R.DASHBOARD);
    }
  }, []);

  return (
    <Switch>
      <PrivateRoute path={R.DASHBOARD}>
        <Dashboard />
      </PrivateRoute>
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;
