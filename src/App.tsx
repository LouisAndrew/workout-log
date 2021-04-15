import React, { useEffect } from 'react';
import {
  Switch, Route, useHistory, useLocation
} from 'react-router-dom';
import { Dashboard } from '@r/Dashboard';
import { Login } from '@r/Login';
import { VerifyEmail } from '@r/VerifyEmail';
import { PrivateRoute, R } from '@r/index';
import { Template } from '@r/Template';
import { ExerciseLog } from '@r/ExerciseLog';
import { Settings } from '@r/Settings';
import { Sidebar } from '@components/Sidebar';

function App() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      history.push(R.DASHBOARD);
    }
  });

  return (
    <div className="flex">
      {location.pathname !== '/login' && (
        <Sidebar location={location.pathname} />
      )}
      <Switch>
        <PrivateRoute path={R.DASHBOARD}>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path={R.TEMPLATE}>
          <Template />
        </PrivateRoute>
        <PrivateRoute path={R.LOG}>
          <ExerciseLog />
        </PrivateRoute>
        <PrivateRoute path={R.SETTINGS}>
          <Settings />
        </PrivateRoute>
        <Route path={R.LOGIN} component={Login} />
        <Route path={R.VERIFY_EMAIL} component={VerifyEmail} />
      </Switch>
    </div>
  );
}

export default App;
