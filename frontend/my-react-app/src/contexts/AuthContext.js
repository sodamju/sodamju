import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../api/myApi'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const login = async (email, password) => {
  //   try {
  //     const response = await axios.post(
  //       '/api/members/login',
  //       { email, password },  // 단순 JSON 객체로 email, password 전달
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',  // 요청이 JSON 형식임을 명시
  //         },
  //       }
  //     );
  //     setUser(response.data);  // 로그인된 사용자 정보를 상태에 저장
  //   } catch (err) {
  //     console.error("Login failed", err);
  //   }
  // };
  // 로그인 함수
  const login = (userData) => {
    console.log("유저 데이터 : ", userData);
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
