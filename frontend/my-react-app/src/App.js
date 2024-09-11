import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <div>
        {/* Switch 대신 Routes 사용 */}
        <Routes>
          {/* component 대신 element를 사용하고 JSX로 컴포넌트를 전달 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/ListPage" element={<ListPage />} />
          <Route path="/DetailPage" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;