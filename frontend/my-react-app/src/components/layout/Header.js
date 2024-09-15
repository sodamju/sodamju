import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      
      <nav className="nav">
        <Link class="navbar-brand" to="/">
          <div className="logo">K-sipsip</div>
        </Link>
        <Link to={"/login"} className='btn'>로그인</Link>
      </nav>
    </header>
  );
}

export default Header;
