// MainContent.js
import React, { useState } from 'react';
import './MainContent.css';
import { useNavigate } from 'react-router-dom';

function MainContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim().length >= 2) {
      navigate(`/search/${searchTerm}`);  // 검색 페이지로 이동, 검색어를 URL에 포함
    } else {
      alert('검색어는 최소 2자 이상 입력해주세요.');
    }
  };

  return (
    <main className="main">
      <div className="main-content">
        <h1 className="title">SipSip</h1>
        <h2 className="subtitle">( : 조금씩 마시다, 한모금)</h2>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="전통주 검색하기" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>search</button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
