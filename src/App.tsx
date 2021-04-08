import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from '@r/Main';
import PrivateRoute from '@r/PrivateRoute';
import AuthProvider from '@h/context/AuthContext';
import { Login } from './routes/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard">
            <Main />
          </PrivateRoute>
          {/* <Route path="/dashboard">
          <Main />
        </Route> */}
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
