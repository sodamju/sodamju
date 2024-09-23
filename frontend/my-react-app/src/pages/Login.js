import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/myApi'; // axiosInstance import
import FormComponent from '../components/LoginComponent';
import SignupCardComponent from '../components/SignupCardComponent';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // 로그인 함수 사용

  const formFields = [
    { controlId: 'email', label: '이메일', type: 'email', placeholder: '이메일 입력' },
    { controlId: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호 입력' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value; 
    const password = e.target.password.value;

    try {
      // 서버에 로그인 요청 (쿠키에 토큰을 저장하므로 응답 데이터를 따로 저장할 필요가 없음)
      const response = await axiosInstance.post('/members/login', { email, password });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        
        // 로그인 성공 시, AuthContext의 login 함수를 호출하여 사용자 정보를 업데이트
        login(response.data);
        
        // 로그인 성공 후 홈으로 리다이렉트
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false); // 요청이 끝나면 로딩 상태를 false로 설정
    }
  };

  return (
    <SignupCardComponent title="로그인">
      <FormComponent
        buttonText={loading ? '로그인 중...' : '로그인'}
        formFields={formFields}
        onSubmit={handleSubmit}
        disabled={loading} // 로딩 중이면 입력 폼과 버튼 비활성화
      >
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
        <div className="login-link mt-3 text-center">
          <Link to="/signup">회원가입</Link>
        </div>
      </FormComponent>
    </SignupCardComponent>
  );
};

export default Login;