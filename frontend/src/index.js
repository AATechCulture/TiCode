import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Splash from './pages/splash';
import Dashboard from './pages/dashboard';
import Conversations from './pages/conversations';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} /> {/* Splash as the home page */}
        <Route path="Dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        <Route path="Conversations" element={<Conversations />} /> {/* Dashboard route */}
        <Route path="Profile" element={<Profile />} /> {/* Dashboard route */}
        <Route path="Login" element={<Login />} /> {/* Dashboard route */}
        <Route path="Register" element={<Register />} /> {/* Dashboard route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
