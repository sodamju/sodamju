import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../api/myApi'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 로그인 함수
  const login = (userData) => {
    console.log("Received user data:", userData);
    setUser(userData);
    // 유저 데이터를 로컬 스토리지에 저장할 수도 있음
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    await axios.post('/api/members/logout');
    setUser(null);  // 로그아웃 후 사용자 상태 초기화
  };

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/members/me');
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();  // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져옴
  }, []);

  // 로그인 여부를 판단하는 상태
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user,isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
