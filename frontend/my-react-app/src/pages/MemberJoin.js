import React from 'react';
import { Button, Form } from 'react-bootstrap';
import SignupCardComponent from '../components/SignupCardComponent';

const MemberJoin = ({ formData, setFormData, nextStep }) => {

  return (
    <SignupCardComponent title="회원가입">
      <Form.Group className='singContainer'>
        <Form.Label>이메일</Form.Label>
        <Form.Control 
            type="email"
            value={ formData.email }
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        <Form.Label>비밀번호</Form.Label>
        <Form.Control 
            type="password"
            value={ formData.password }
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
      </Form.Group>
      <Button className="sign-btn" variant="dark" onClick={nextStep}>Next</Button>
    </SignupCardComponent>
  ); 
};

export default MemberJoin;
