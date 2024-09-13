// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindPassword from './pages/FindPassword';
import MyPage from './pages/MyPage';
import EditMember from './pages/EditMember';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findpassword" element={<FindPassword />}/>
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/edit-member" element={<EditMember />}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
