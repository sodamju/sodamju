// src/App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import Layout from './components/layout/Layout'
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindPassword from './pages/FindPassword';
import MyPage from './pages/MyPage';
import EditMember from './pages/EditMember';
import Review from './pages/Review';


function App() {
  return (
    <AuthProvider>  {/* AuthProvider로 Router 전체를 감싸기 */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/FindPassword" element={<FindPassword />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/edit-member" element={<EditMember />} />

            <Route path="/review/:productId" element={<Review isEditing={false} />} />
            <Route path="/review/:productId/edit/:reviewId" element={<Review isEditing={true} />} />
            <Route path="/ListPage" element={<ListPage />} />


            <Route path="/search/:searchTerm" element={<ListPage />} />

            <Route path="/DetailPage/:productId" element={<DetailPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;