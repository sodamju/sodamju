  import React from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { useAuth } from '../../contexts/AuthContext';
  import logoImg from '../../assets/images/logo2.png';
  import './Header.css';

  function Header() {
    const { user, logout } = useAuth();  // 로그인 상태와 로그아웃 함수 사용
    const location = useLocation();  // 현재 경로를 가져옴

    // 특정 경로에서만 배경을 흰색으로 설정
    const isWhiteBackground = location.pathname === '/RankAll';  // 이 페이지에서만 흰색 배경

    return (
      <header className="header" style={{ backgroundColor: isWhiteBackground ? 'white' : '#F3E0D6' }}>
        
        <nav className="nav">
          <Link class="navbar-brand" to="/">
            <div className="logo"><img src={logoImg} alt="Logo" /> 소담주</div>
          </Link>
          {user ? (
            <>
              <Link to={"/mypage"} className='btn btn-logged-in'>마이페이지</Link>
              <Link to="/" className='btn btn-logout' onClick={logout}>로그아웃</Link>
            </>
          ) : (
            <Link to={"/login"} className='btn btn-logged-out'>로그인</Link>
          )}
        </nav>
      </header>
    );
  }

  export default Header;
