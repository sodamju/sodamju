import React from 'react';
import { Image, Button, Form, Container, Row, Col } from 'react-bootstrap';
import SignupCardComponent from '../components/SignupCardComponent';
import './MemberJoin.css'
import lv1 from '../assets/images/lv1.png';
import lv2 from '../assets/images/lv2.png';
import lv3 from '../assets/images/lv3.png';

const MemberJoin = ({ formData, setFormData, handleSubmit }) => {

   // 라디오 버튼의 선택 상태를 변경하는 함수
   const handleChange = (e) => {
    setFormData({ ...formData, ageGroup: e.target.value });
  };
  // 라디오 버튼의 선택 상태를 변경하는 함수
  const levelChange = (e) => {
    setFormData({ ...formData, level: e.target.value });
  };

  return (
    <SignupCardComponent title="추가정보 입력">
        <Form.Group className='singContainer'>
          <Form.Label>닉네임</Form.Label>
          <Form.Control 
              type="text"
              value={ formData.nickname }
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}/>
          <Form.Label>연령대를 선택해주세요</Form.Label>
          <Container className="form_toggle">
            <Row>
              <Col>
                <Form.Check
                  className='form_radio_btn'
                  type="radio"
                  id="radio-1"
                  label="20대"
                  name="ageGroup"
                  value="20"
                  checked={formData.ageGroup === '20'}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Check
                className='form_radio_btn'
                  type="radio"
                  id="radio-2"
                  label="30대"
                  name="ageGroup"
                  value="30"
                  checked={formData.ageGroup === '30'}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  className='form_radio_btn'
                  type="radio"
                  id="radio-3"
                  label="40대"
                  name="ageGroup"
                  value="40"
                  checked={formData.ageGroup === '40'}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Check
                  className='form_radio_btn'
                  type="radio"
                  id="radio-4"
                  label="50대"
                  name="ageGroup"
                  value="50"
                  checked={formData.ageGroup === '50'}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
              <Form.Check
                className='form_radio_btn'
                type="radio"
                id="radio-5"
                label="60대 이상"
                name="ageGroup"
                value="60"
                checked={formData.ageGroup === '60'}
                onChange={handleChange}
              />
              </Col>
              <Col>
              <Form.Check
                className='form_radio_btn'
                type="radio"
                id="radio-6"
                label="비공개"
                name="ageGroup"
                value="비공개"
                checked={formData.ageGroup === '비공개'}
                onChange={handleChange}
              />
              </Col>
            </Row>
          </Container>
          <Form.Label>당신의 주당 레벨을 선택해주세요</Form.Label>
            <Container>
              <Row>
                <Col>
                  <Form.Check
                    className='level_radio_btn'
                    type="radio"
                    id="level-1"
                    name="level"
                    value="1"
                    checked={formData.level === '1'}
                    onChange={levelChange}
                    label={<Image src={lv1}
                                  width="65" height="65"
                                  onClick={levelChange}/>}
                  />
                </Col>
                <Col>
                  <Form.Check
                    className='level_radio_btn'
                    type="radio"
                    id="level-2"
                    name="level"
                    value="2"
                    checked={formData.level === '2'}
                    onChange={levelChange}
                    label={<Image src={lv2}
                                  width="65" height="65"
                                  onClick={levelChange}/>}
                  />
                </Col>
                <Col>
                  <Form.Check
                    className='level_radio_btn'
                    type="radio"
                    id="level-3"
                    name="leve"
                    value="3"
                    checked={formData.level === '3'}
                    onChange={levelChange}
                    label={<Image src={lv3}
                                  width="65" height="65"
                                  onClick={levelChange}/>}
                  />
                </Col>
              </Row>
              <Row className='text-center'>
                <Col>
                  lv.1
                </Col>
                <Col>
                  lv.2
                </Col>
                <Col>
                  lv.3
                </Col>
              </Row>
            </Container>
            
        </Form.Group>
        <Button className="sign-btn" variant="dark" onClick={handleSubmit}>회원가입 완료</Button>
    </SignupCardComponent>
  ); 
};

export default MemberJoin;
