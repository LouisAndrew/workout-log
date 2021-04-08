import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from '@h/context/AuthContext';
import SupabaseProvider from '@h/context/SupabaseContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SupabaseProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </SupabaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
