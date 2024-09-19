import React, { useState, useEffect } from 'react';
import { Image, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'; // 로그인된 사용자 정보 사용
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/myApi'; // Axios 인스턴스
import SignupCardComponent from '../components/SignupCardComponent';
import '../pages/MemberJoin.css';
import lv1 from '../assets/images/lv1.png';
import lv2 from '../assets/images/lv2.png';
import lv3 from '../assets/images/lv3.png';

const EditMember = () => {
  const { user, login } = useAuth(); // 로그인된 사용자 정보와 로그인 함수
  const [nickname, setNickname] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();

  // 사용자 정보를 불러와서 초기값 설정
  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setAgeGroup(user.ageGroup);
      setLevel(user.level);
    }
  }, [user]);

  // 수정된 사용자 정보를 백엔드로 저장
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/members/${user.id}`, {
        nickname,
        ageGroup,
        level,
      });

      // 업데이트된 사용자 정보를 다시 AuthContext에 저장
      login(response.data);
      
      // 저장 후 마이페이지로 리다이렉트
      navigate('/mypage');
    } catch (error) {
      console.error('정보 수정 실패:', error);
    }
  };

  return (
    <SignupCardComponent title="정보수정">
      <Form onSubmit={handleSubmit}>
        <Form.Group className='singContainer'>
          <Form.Label>닉네임</Form.Label>
          <Form.Control 
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />

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
                  checked={ageGroup === '20'}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
                  checked={ageGroup === '30'}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
                  checked={ageGroup === '40'}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
                  checked={ageGroup === '50'}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
                  checked={ageGroup === '60'}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
                  checked={ageGroup === '비공개'}
                  onChange={(e) => setAgeGroup(e.target.value)}
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
                  checked={level === '1'}
                  onChange={(e) => setLevel(e.target.value)}
                  label={<Image src={lv1} width="65" height="65"/>}
                />
              </Col>
              <Col>
                <Form.Check
                  className='level_radio_btn'
                  type="radio"
                  id="level-2"
                  name="level"
                  value="2"
                  checked={level === '2'}
                  onChange={(e) => setLevel(e.target.value)}
                  label={<Image src={lv2} width="65" height="65"/>}
                />
              </Col>
              <Col>
                <Form.Check
                  className='level_radio_btn'
                  type="radio"
                  id="level-3"
                  name="level"
                  value="3"
                  checked={level === '3'}
                  onChange={(e) => setLevel(e.target.value)}
                  label={<Image src={lv3} width="65" height="65"/>}
                />
              </Col>
            </Row>
            <Row className='text-center'>
              <Col>lv.1</Col>
              <Col>lv.2</Col>
              <Col>lv.3</Col>
            </Row>
          </Container>
        </Form.Group>

        <Button className="sign-btn" variant="dark" type="submit">저장하기</Button>
      </Form>
    </SignupCardComponent>
  );
};

export default EditMember;