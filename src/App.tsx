import React, { useEffect, useRef, useState } from 'react';
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
import { useAuth } from '@h/useAuth';

const darkModeId = 'use-dark-mode';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { signOut } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const firstRender = useRef(true);

  const loadDarkModeStorage = () => localStorage.getItem(darkModeId) ?? 'false';
  const saveDarkModeStorage = (value: boolean) => {
    localStorage.setItem(darkModeId, `${value}`);
  };

  const signUserOut = async () => {
    const response = await signOut();
    if (response) {
      history.push(R.LOGIN);
    }
  };

  useEffect(() => {
    setDarkMode(loadDarkModeStorage() === 'true');
    firstRender.current = false;
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      saveDarkModeStorage(darkMode);
    }
  }, [darkMode]);

  useEffect(() => {
    if (location.pathname === '/') {
      history.push(R.DASHBOARD);
    }
  });

  return (
    <div className={`app__wrapper ${darkMode ? 'dark' : ''}`}>
      {location.pathname !== '/login' && (
        <Sidebar
          location={location.pathname}
          darkMode={darkMode}
          setDarkMode={(val) => setDarkMode(val)}
          logOut={signUserOut}
        />
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
