import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Main } from '@r/Main';
import PrivateRoute from '@r/PrivateRoute';
import { Login } from '@r/Login';
import AuthProvider from '@h/context/AuthContext';
import SupabaseProvider from '@h/context/SupabaseContext';

function App() {
  return (
    <SupabaseProvider>
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
    </SupabaseProvider>
  );
}

export default App;
