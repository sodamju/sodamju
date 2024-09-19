import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Spring Boot 백엔드 URL

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // 쿠키를 자동으로 포함
});

export default axiosInstance;