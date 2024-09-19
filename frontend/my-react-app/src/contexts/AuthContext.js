// src/contexts/AuthContext.js 또는 src/auth/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Context 생성
const AuthContext = createContext();

// Context Provider 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 로그인된 사용자 상태

  // 로그인 함수
  const login = (userData) => {
    console.log("Received user data:", userData);
    setUser(userData);
    // 유저 데이터를 로컬 스토리지에 저장할 수도 있음
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // 로그아웃 시 로컬 스토리지에서 유저 정보 삭제
  };

  // Context로 제공할 값
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 사용자 정보를 사용하는 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};