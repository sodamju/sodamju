import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SignupCardComponent from '../components/SignupCardComponent';
import axiosInstance from '../api/myApi'; // Axios 인스턴스

const MemberJoin = ({ formData, setFormData, nextStep }) => {
  const [emailError, setEmailError] = useState('');//이메일 에러상태
  const [passwordError, setPasswordError] = useState(''); //비밀번호 에러상태
  const [isCheckingEmail, setIsCheckingEmail] = useState(false); // 이메일 중복 체크 상태

  //이메일 유효성 검사
  const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //이메일 폼 유효성 검사 이벤트
  const handleEmailChange = (e) =>{
    const email = e.target.value;
    setFormData({ ...formData, email: email });

    if (!validateEmail(email)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 입력 변화 이벤트
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password: password });

    if (!password.trim()) {
      setPasswordError('필수 입력 항목입니다.');
    } else {
      setPasswordError('');
    }
  };

  // 이메일 중복 체크 검사
   const checkEmailExists = async (email) => {
    setIsCheckingEmail(true);
    try {
      const response = await axiosInstance.get(`/members/check-email?email=${email}`);
      return response.data; // true면 이미 존재하는 이메일
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };
 
  // 제출 전에 필수 정보 폼 검증
  const validateForm = () => {
    let valid = true;

    if (!formData.email.trim()) {
      setEmailError('필수 입력 항목입니다.');
      valid = false;
    }

    if (!formData.password.trim()) {
      setPasswordError('필수 입력 항목입니다.');
      valid = false;
    }

    return valid;
  };

  //next 버튼 클릭시 유효한 이메일만 통과
  // 버튼 클릭시 중복된 이메일이면 '이미 가입된 회원 입니다.'출력
  const handleNext = async () => {
    //필수 이메일, 비번 입력 
    if (!validateForm()){
      return;
    }
     // 이메일 중복 체크
     const emailExists = await checkEmailExists(formData.email);
     if (emailExists) {
       setEmailError('이미 가입된 회원입니다.');
     } else {
       setEmailError('');
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
            onChange={handlePasswordChange}
            isInvalid={!!passwordError}/>
        <Form.Control.Feedback type="invalid">
          {passwordError} {/* 비밀번호 에러 메시지 출력 */}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="sign-btn" variant="dark" onClick={handleNext}>다음</Button>
    </SignupCardComponent>  
  ); 
};

export default MemberJoin;
