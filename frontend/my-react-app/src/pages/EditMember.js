import React from 'react';
import { Image, Button, Form, Container, Row, Col } from 'react-bootstrap';
import SignupCardComponent from '../components/SignupCardComponent';
import '../pages/MemberJoin.css';
import lv1 from '../assets/images/lv1.png';
import lv2 from '../assets/images/lv2.png';
import lv3 from '../assets/images/lv3.png';

const MemberJoinLayout = () => {

  return (
    <SignupCardComponent title="정보수정">
        <Form.Group className='singContainer'>
          <Form.Label>닉네임</Form.Label>
          <Form.Control 
              type="text"
              placeholder="닉네임을 입력하세요"/>

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
                />
              </Col>
              <Col>
                <Form.Check
                className='form_radio_btn'
                  type="radio"
                  id="radio-2"
                  label="30대"
                  name="ageGroup"
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
                />
              </Col>
              <Col>
                <Form.Check
                  className='form_radio_btn'
                  type="radio"
                  id="radio-4"
                  label="50대"
                  name="ageGroup"
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
              />
              </Col>
              <Col>
              <Form.Check
                className='form_radio_btn'
                type="radio"
                id="radio-6"
                label="비공개"
                name="ageGroup"
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
                    label={<Image src={lv1}
                                  width="65" height="65"/>}
                  />
                </Col>
                <Col>
                  <Form.Check
                    className='level_radio_btn'
                    type="radio"
                    id="level-2"
                    name="level"
                    label={<Image src={lv2}
                                  width="65" height="65"/>}
                  />
                </Col>
                <Col>
                  <Form.Check
                    className='level_radio_btn'
                    type="radio"
                    id="level-3"
                    name="level"
                    label={<Image src={lv3}
                                  width="65" height="65"/>}
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

        <Button className="sign-btn" variant="dark">저장하기</Button>
    </SignupCardComponent>
  ); 
};

export default MemberJoinLayout;
