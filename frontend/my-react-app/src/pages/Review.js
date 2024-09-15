// src/pages/Review.js
import React, { useState }  from 'react';
import { Image, Button, Form, Card ,Container, Row, Col } from 'react-bootstrap';
import StarComponent from '../components/StarComponent';
import './Review.css';



const Review = () => {
        // 리뷰에 사용되는 변수
        const [rating, setRating] = useState(0);
        const [reviewText, setReviewText] = useState('');
        const [tipText, setTipText] = useState('');
        const [selectedImages, setSelectedImages] = useState([]);

        // 사진을 선택하면 상태에 저장하고 미리보기 제공
        const handleImageChange = (e) => {
            const files = Array.from(e.target.files);
            const imageUrls = files.map((file) => URL.createObjectURL(file));
            setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
        };

        // 특정 사진 삭제 함수
        const handleImageRemove = (indexToRemove) => {
            setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
        };

        // 제출 버튼
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log('별점:', rating);
          console.log('리뷰 내용:', reviewText);
          console.log('꿀팁 내용:', tipText);
          console.log('선택된 이미지:', selectedImages);
          // 리뷰 제출 처리 로직 추가
        };
      

  return (
    <Container>
        <Row className='mt-3 mb-3'><h1>리뷰 쓰기</h1></Row>
        {/* 상품 정보 카드 */}
        <Row className='mt-3 mb-3'>
            <Card className='p-3'>
                <Row>
                    <Col>
                        <div className="imageContainer">
                        {/* 이미지가 표시될 부분 */}
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Row>
                            <h1>제품명</h1>
                        </Row>
                        <Row>
                            <div>
                                제품 설명
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Form onSubmit={handleSubmit}>
            <Row className='mt-3 mb-3'>
                <Card className='p-3 text-center'>
                    <Form.Group>    
                        <Form.Label>별점</Form.Label>
                        <StarComponent rating={rating} setRating={setRating} />
                    </Form.Group>
                </Card>
            </Row>
            <Row className='mt-3 mb-3'>
                <Card className='p-3'>
                    <Form.Group>
                        <Form.Label><p><strong>리뷰</strong>(필수)</p></Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        value={reviewText}
                        placeholder='제품에 대해 자세한 리뷰를 작성해 주세요. 맛과 향 등 자세한 평을 추가해 주시면 좋습니다. (최소 20자)'
                        onChange={(e) => setReviewText(e.target.value)}
                        />
                    </Form.Group>
                </Card>
            </Row>
            <Row className='mt-3 mb-3'>
                <Card className='p-3'>
                    <Form.Group>
                        <Form.Label><p><strong>꿀팁</strong>(선택)</p></Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        value={tipText}
                        placeholder='다른 사용자에게 알려주고 싶은 나만의 안주 조합, 도움이 될 수 있는 정보 등을 적어주세요.'
                        onChange={(e) => setTipText(e.target.value)}
                        />
                    </Form.Group>
                </Card>
            </Row>
            <Row className='mt-3 mb-3'>
                <Card className='p-3'>
                    {/* 사진 첨부 */}
                    <Form.Group>
                        <Form.Label>사진 첨부</Form.Label>
                        <Form.Control
                        type="file"
                        accept="image/*"
                        multiple // 다중 파일 선택 가능
                        onChange={handleImageChange}
                        />
                    </Form.Group>

                    {/* 미리보기 및 삭제 버튼 */}
                    {selectedImages.length > 0 && (
                        <div>
                        <p>사진 미리보기:</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {selectedImages.map((imageUrl, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <Image src={imageUrl} alt="미리보기 이미지" width="100" height="100" thumbnail />
                                <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleImageRemove(index)}
                                style={{ position: 'absolute', top: '0', right: '0' }}
                                >
                                X
                                </Button>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                </Card>
            </Row>
            <Button variant="primary" type="submit">
                리뷰 제출
            </Button>
        </Form>
        
    </Container>
  );
};

export default Review;
