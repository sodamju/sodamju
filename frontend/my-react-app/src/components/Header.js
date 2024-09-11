import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">K-sipsip</div>
      <nav className="nav">
        <button className="btn">로그인</button>
        <button className="btn">회원가입</button>
      </nav>
    </header>
  );
}

export default Header;
