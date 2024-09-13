import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Spring Boot 백엔드 URL

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;