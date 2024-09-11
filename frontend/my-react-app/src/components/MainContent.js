import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <main className="main">
      <div className="main-content">
        <h1 className="title">SipSip</h1>
        <h2 className="subtitle">( : 조금씩 마시다, 한모금)</h2>
        <div className="search-bar">
          <input type="text" placeholder="전통주 검색하기" />
          <button className="search-btn">search</button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;