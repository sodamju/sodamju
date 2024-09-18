import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // URL 파라미터를 받아오기 위한 훅
import { Image, Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import StarComponent from '../components/StarComponent';
import './Review.css';

const Review = () => {
    const { productId } = useParams();  // URL에서 productId 파라미터를 가져옴
    const [product, setProduct] = useState(null);  // 제품 정보 저장할 상태
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [tipText, setTipText] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    
    // 제품 정보를 가져오는 함수
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/alcohols/${productId}`);
                if (!response.ok) {
                    throw new Error('제품 정보를 불러오지 못했습니다.');
                }
                const data = await response.json();
                setProduct(data);  // 제품 정보 설정
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

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
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            productId,  // 제품 ID 저장
            rating,
            reviewText,
            tipText,
            images: selectedImages,
        };

        try {
            const response = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('리뷰가 성공적으로 저장되었습니다:', result);
                // 성공적으로 작성후 디테일페이지로 돌아가기
                navigate(`/DetailPage/${productId}`);
            } else {
                console.error('리뷰 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('리뷰 전송 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <Container>
            <Row className='mt-3 mb-3'><h1>리뷰 쓰기</h1></Row>
            {/* 상품 정보 카드 */}
            {product && (
                <Row className='mt-3 mb-3'>
                    <Card className='p-3'>
                        <Row>
                            <Col>
                                <div className="imageContainer">
                                    <Image src={product.thumUrl} alt={product.title} />
                                </div>
                            </Col>
                            <Col xs={9}>
                                <Row>
                                    <h1>{product.title}</h1>  {/* 제품명 표시 */}
                                </Row>
                                <Row>
                                    <div>{product.description}</div>  {/* 제품 설명 표시 */}
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            )}
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
                                placeholder='제품에 대해 자세한 리뷰를 작성해 주세요.'
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
                                placeholder='도움이 될 수 있는 꿀팁을 작성해 주세요.'
                                onChange={(e) => setTipText(e.target.value)}
                            />
                        </Form.Group>
                    </Card>
                </Row>
                <Row className='mt-3 mb-3'>
                    <Card className='p-3'>
                        <Form.Group>
                            <Form.Label>사진 첨부</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                        </Form.Group>

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
