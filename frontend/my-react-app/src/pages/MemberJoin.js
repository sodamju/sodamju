import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SignupCardComponent from '../components/SignupCardComponent';

const MemberJoin = ({ formData, setFormData, nextStep }) => {
  const [emailError, setEmailError] = useState('');//이메일 에러상태

  //이메일 유효성 검사
  const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //이메일 검증함수
  const handleEmailChange = (e) =>{
    const email = e.target.value;
    setFormData({ ...formData, email: email });

    //검사
    if (!validateEmail(email)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
    } else {
      setEmailError('');
    }
  };

  //next 버튼 클릭시 유효한 이메일만 통과
  const handleNext = () => {
    if (!validateEmail(formData.email)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
    } else {
      nextStep();
    }
  };


  return (
    <SignupCardComponent title="회원가입">
      <Form.Group className='signContainer'>
        <Form.Label>이메일</Form.Label>
        <Form.Control 
            type="email"
            value={ formData.email }
            onChange={handleEmailChange}
            isInvalid={!!emailError}/>
        <Form.Control.Feedback type="invalid">
          {emailError}
        </Form.Control.Feedback>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control 
            type="password"
            value={ formData.password }
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
      </Form.Group>
      <Button className="sign-btn" variant="dark" onClick={handleNext}>다음</Button>
    </SignupCardComponent>
  ); 
};

export default MemberJoin;
