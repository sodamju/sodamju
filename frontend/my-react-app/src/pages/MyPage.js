// src/pages/MyPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Tab, Stack, Badge, Image, Card ,Container, Row, Col } from 'react-bootstrap';
import ReviewCardComponent from '../components/ReviewCardComponent';
import FavoritesCardComponent from '../components/FavoritesCardComponent';
import user from '../assets/images/user.png';
import './MyPage.css';



const MyPage = () => {
  return (
    <Container>
        <Row className='mt-3 mb-3'><h1>내 정보</h1></Row>
        {/* 유저 정보 카드 */}
        <Row className='mt-3 mb-3'>
            <Card className='p-3'>
                <Row>
                    <Col>
                        <Image src={user} width="95" height="95"/>
                    </Col>
                    <Col xs={9}>
                        <Row>
                            <h1>닉네임</h1>
                        </Row>
                        <Row>
                            <Stack direction='horizontal' gap={2}>
                                <Badge bg="secondary">20대</Badge>
                                <Badge bg="secondary">lv.3</Badge>
                            </Stack>
                        </Row>
                    </Col>
                    <Col className='text-end'>
                        <Link to="/edit-member">정보수정</Link>
                    </Col>
                </Row>
            </Card>
        </Row>
        {/* 활동 상세 */}
        <Row className='mt-3 mb-3'><h1>내 활동</h1></Row>
        <Row className='mt-3 mb-3'>
            <Card className='p-3'>
                <Tab.Container defaultActiveKey="home">
                    <Nav  className='mb-3' variant="pills" id="myTab">
                        <Nav.Item>
                        <Nav.Link eventKey="home">내가 쓴 리뷰</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="profile">좋아요한 리뷰</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="contact">즐겨찾기한 전통주</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="home">
                            {Array.from({ length: 5 }).map((_, index) => (
                            <ReviewCardComponent key={index} authorship={true} />
                            ))}
                        </Tab.Pane>
                        <Tab.Pane eventKey="profile">
                             {Array.from({ length: 5 }).map((_, index) => (
                            <ReviewCardComponent key={index} authorship={false} />
                            ))}
                        </Tab.Pane>
                        <Tab.Pane eventKey="contact">
                            <Row>
                                <Col>
                                    <FavoritesCardComponent
                                        title="전통주"
                                        content="전통주에 대한 설명이 들어가는 자리입니다."/>
                                </Col>
                                <Col>
                                    <FavoritesCardComponent
                                        title="전통주"
                                        content="전통주에 대한 설명이 들어가는 자리입니다."/>
                                </Col>
                                <Col>
                                    <FavoritesCardComponent
                                        title="전통주"
                                        content="전통주에 대한 설명이 들어가는 자리입니다."/>
                                </Col>
                                <Col>
                                    <FavoritesCardComponent
                                        title="전통주"
                                        content="전통주에 대한 설명이 들어가는 자리입니다."/>
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
        </Row>
    </Container>
  );
};

export default MyPage;
