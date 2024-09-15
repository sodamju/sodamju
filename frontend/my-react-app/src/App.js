// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import Layout from './components/layout/Layout'
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
          <Route path="/ListPage" element={<ListPage />} />
          <Route path="/DetailPage" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;