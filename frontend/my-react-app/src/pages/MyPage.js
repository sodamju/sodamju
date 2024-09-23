import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Tab, Stack, Badge, Image, Card, Container, Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import ReviewCardComponent from '../components/ReviewCardComponent';
import AlcoholCardComponent from '../components/AlcoholCardComponent';
import { useAuth } from '../contexts/AuthContext';  // 로그인한 사용자 정보 사용
import axiosInstance from '../api/myApi'; // Axios 인스턴스
import { IoCamera } from 'react-icons/io5';  // 카메라 아이콘
import defaultUserImg from '../assets/images/User.png';
import './MyPage.css';

const MyPage = () => {
    const { user } = useAuth();  
    const [userInfo, setUserInfo] = useState(null);  // 사용자 정보를 저장할 상태
    const [selectedFile, setSelectedFile] = useState(null); // 파일 선택 상태 추가
    const [showModal, setShowModal] = useState(false);  // 모달 표시 상태
    const [uploadError, setUploadError] = useState('');
    const [reviews, setReviews] = useState([]);  // 사용자가 쓴 리뷰 목록
    const [alcohols, setAlcohols] = useState([]) // 사용자가 좋아요한 전통주
    const navigate = useNavigate();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUploadError('');  // 모달을 닫을 때 에러 메시지 초기화
    };

    // 사용자 정보 불러오기
    useEffect(() => {
        if (user && user.id) {
            axiosInstance.get(`/members/me`)
                .then(response => {
                    setUserInfo(response.data);  // 사용자 정보 저장
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
            
            // 내가 쓴 리뷰 가져오기
            axiosInstance.get(`/reviews/user-reviews?userId=${user.id}`)
                .then(response => {
                    setReviews(response.data);  // 리뷰 목록 저장
                })
                .catch(error => {
                    console.error('Error fetching user reviews:', error);
                });

            // 좋아요한 전통주 가져오기
            axiosInstance.get(`/likes/list?memberId=${user.id}`)
                .then(response => {
                    setAlcohols(response.data);  // 리뷰 목록 저장
                })
                .catch(error => {
                    console.error('Error fetching user reviews:', error);
                });
        }
    }, [user]);

    // detail page navigate
    const handleDetailClick = (id) => {
        navigate(`/DetailPage/${id}`);
      };

    // 파일 선택 처리
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // 파일 업로드 요청 및 DB에 업데이트
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('파일을 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // S3 업로드를 위한 백엔드 API 호출
            const response = await axiosInstance.post(`/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = response.data.imageUrl;  // S3에서 반환된 이미지 URL
            console.log('S3 이미지 URL:', imageUrl);

           // 업로드 후 사용자 정보 업데이트
           const updatedUserInfo = { ...userInfo, profileImageUrl: imageUrl };
           setUserInfo(updatedUserInfo);

           setShowModal(false);  // 성공적으로 업로드하면 모달을 닫음

           // 이미지 URL을 백엔드에 PUT 요청으로 전송 (순수 문자열로 전송)
            await axiosInstance.put(`/members/${user.id}/profile-image`, {
                profileImageUrl: imageUrl,  // 순수 문자열 전송
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('업로드할 수 없습니다. 다시 시도해주세요.');
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
                            <Button className='camera' variant="link" onClick={handleShowModal} style={{ position: 'absolute', top: '70px', left: '70px' }}>
                                <IoCamera size={22} />
                            </Button>
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

                    {/* 모달 for 프로필 사진 업로드 */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>프로필 사진 업로드</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>새 프로필 사진을 선택하세요:</Form.Label>
                                    <Form.Control type="file" onChange={handleFileChange} />
                                </Form.Group>
                                <Button variant="primary" onClick={handleUpload}>
                                    업로드
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                </Card>
            </Row>

            {/* 활동 상세 */}
            <Row className='mt-3 mb-3'><h3>내 활동</h3></Row>
            <Row className='mt-3 mb-3 padding-box'>

                <Card className='reviewList'>
                    <Tab.Container defaultActiveKey="myReviews" >
                        <Nav className='mb-3' variant="pills" id="myTab">
                            <Nav.Item>
                                <Nav.Link eventKey="myReviews">내가 쓴 리뷰</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="myAlcohols">좋아요한 전통주</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="myReviews">
                                <Row>
                                    {reviews.map(review => (
                                        <ReviewCardComponent 
                                            key={review.id} 
                                            review={review} 
                                            onDetailClick={handleDetailClick}
                                            setReviews={setReviews}  reviews={reviews} // reviews상태 변화를 위한 setReviews,reviews 하위 컴포넌트에 전달
                                            />
                                    ))}
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="myAlcohols">
                                <Row>
                                    <AlcoholCardComponent alcohols={alcohols} onDetailClick={handleDetailClick} />
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
