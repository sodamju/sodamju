import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormComponent from '../components/LoginComponent';
import SignupCardComponent from '../components/SignupCardComponent';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formFields = [
    { controlId: 'email', label: '이메일', type: 'email', placeholder: '이메일 입력' },
    { controlId: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호 입력' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('/api/users/login', { email, password })
      .then((response) => {
        console.log('Login successful:', response.data);
        navigate('/'); // 로그인 성공 후 리다이렉트
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setLoading(false);
      });
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
        <div className="login-link mt-3">
          <Link to="/signup">회원가입</Link> / <Link to="/FindPassword">비밀번호 찾기</Link>
        </div>
      </FormComponent>
    </SignupCardComponent>
  );
};

export default Login;
