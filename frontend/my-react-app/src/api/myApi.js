import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Spring Boot 백엔드 URL

export const fetchDocuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents', error);
    throw error;
  }
};
