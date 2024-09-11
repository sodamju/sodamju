import React from 'react';
import { Link } from 'react-router-dom';
import FormComponent from '../components/LoginComponent';
import SignupCardComponent from '../components/SignupCardComponent';

const Login = () => {
  const formFields = [
    { controlId: 'email', label: '이메일', type: 'email', placeholder: '이메일 입력' },
    { controlId: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호 입력' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  return (
    <SignupCardComponent title="로그인">
        <FormComponent
        buttonText="로그인"
        formFields={formFields}
        onSubmit={handleSubmit}
        >
            <div class="login-link mt-3">
                <Link to="/signup">회원가입 </Link> / <Link to="/FindPassword"> 비밀번호 찾기</Link>
            </div>
        </FormComponent>
    </SignupCardComponent>
  );
};

export default Login;
