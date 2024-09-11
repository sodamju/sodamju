// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindPassword from './pages/FindPassword';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/FindPassword" element={<FindPassword />}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
