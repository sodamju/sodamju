import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();  // 로그인 상태와 로그아웃 함수 사용

  return (
    <header className="header">
      
      <nav className="nav">
        <Link class="navbar-brand" to="/">
          <div className="logo">K-sipsip</div>
        </Link>
        {user ? (
          <>
            <div className='greeting'>안녕하세요, {user.nickname}님</div>
            <Link to={"/mypage"} className='btn btn-logged-in'>마이페이지</Link>
            <button className='btn btn-logged-in' onClick={logout}>로그아웃</button>
          </>
        ) : (
          <Link to={"/login"} className='btn btn-logged-out'>로그인</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
