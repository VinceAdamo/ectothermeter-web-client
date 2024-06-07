import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { DevicePage } from './components/DevicePage';
import { DEVICE_PAGE_PATH, LOGIN_PATH } from './constants';

function App() {
  return (  
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={LOGIN_PATH} Component={LoginForm} />
          <Route path={DEVICE_PAGE_PATH} Component={DevicePage} />
          <Route path="*" element={<Navigate replace to={LOGIN_PATH} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
