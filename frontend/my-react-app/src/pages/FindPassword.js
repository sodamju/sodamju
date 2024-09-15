import React from 'react';
import FormComponent from '../components/LoginComponent';
import SignupCardComponent from '../components/SignupCardComponent';

const FindPassword = () => {
  const formFields = [
    { controlId: 'email', label: '이메일', type: 'email', placeholder: '이메일 입력' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 찾기 처리 로직
  };

  return (
    <SignupCardComponent>
        <FormComponent
            title="비밀번호 찾기"
            buttonText="비밀번호 찾기"
            formFields={formFields}
            onSubmit={handleSubmit}
            />
    </SignupCardComponent>
  );
};

export default FindPassword;
