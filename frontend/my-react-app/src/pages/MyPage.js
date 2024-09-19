// src/pages/MyPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Tab, Stack, Badge, Image, Card ,Container, Row, Col, Form, Button } from 'react-bootstrap';
import ReviewCardComponent from '../components/ReviewCardComponent';
import FavoritesCardComponent from '../components/FavoritesCardComponent';
import { useAuth } from '../contexts/AuthContext';  // 로그인한 사용자 정보 사용
import axiosInstance from '../api/myApi'; // Axios 인스턴스
import defaultUserImg from '../assets/images/User.png';
import './MyPage.css';



const MyPage = () => {
    const { user } = useAuth();  // 로그인한 사용자 정보 (user.id 필요)
    const [userInfo, setUserInfo] = useState(null);  // 사용자 정보를 저장할 상태
    const [selectedFile, setSelectedFile] = useState(null); // 파일 선택 상태 추가

    // 사용자 정보 불러오기
    useEffect(() => {
        if (user && user.id) {
        axiosInstance.get(`/members/${user.id}`)
            .then(response => {
            setUserInfo(response.data);  // 사용자 정보 저장
            })
            .catch(error => {
            console.error('Error fetching user info:', error);
            });
        }
    }, [user]);

    // 파일 선택 처리
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // 파일 업로드 요청
    const handleUpload = async () => {
        if (!selectedFile || !user) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axiosInstance.post(`/members/${user.id}/upload-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // 업로드 후 사용자 정보 업데이트
            setUserInfo(response.data);
            console.log(userInfo.profileImageUrl)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // 로딩 중이거나 사용자 정보가 없는 경우 처리
    if (!userInfo) {
        return <p>로딩 중...</p>;
    }
    return (
        <Container>
            <Row className='mt-3 mb-3'><h3>내 정보</h3></Row>
            {/* 유저 정보 카드 */}
            <Row className='mt-3 mb-3'>
                <Card className='p-3'>
                    <Row>
                        <Col>
                        <Image src={userInfo.profileImageUrl || defaultUserImg} width="95" height="95" />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                <h3 className='nickname'>{userInfo.nickname}</h3>
                            </Row>
                            <Row>
                                <Stack direction='horizontal' gap={2}>
                                    <Badge bg="secondary">{userInfo.ageGroup}대</Badge>
                                    <Badge bg="secondary">lv.{userInfo.level}</Badge>
                                </Stack>
                            </Row>
                        </Col>
                        <Col className='text-end'>
                            <Link to="/edit-member" className='btn'>정보수정</Link>
                        </Col>
                    </Row>
                </Card>
            </Row>

            <Row className='mt-3 mb-3'>
                <Card className='p-3'>
                    <h4>프로필 사진 업로드</h4>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>새 프로필 사진을 선택하세요:</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpload}>
                        업로드
                    </Button>
                </Card>
            </Row>

            {/* 활동 상세 */}
            <Row className='mt-3 mb-3'><h3>내 활동</h3></Row>
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
