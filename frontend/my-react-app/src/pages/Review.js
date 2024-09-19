import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Image, Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import StarComponent from '../components/StarComponent';
import './Review.css';

const Review = () => {
    const { productId } = useParams();  
    const [product, setProduct] = useState(null);  
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [tipText, setTipText] = useState('');
    const [selectedImages, setSelectedImages] = useState([]); // AWS S3 URL이 저장될 상태
    const [formErrors, setFormErrors] = useState({});  // 폼 에러 상태

    // 제품 정보를 가져오는 함수
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/alcohols/${productId}`);
                if (!response.ok) {
                    throw new Error('제품 정보를 불러오지 못했습니다.');
                }
                const data = await response.json();
                setProduct(data); 
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    // 리뷰 제출 전에 폼 검증
    const validateForm = () => {
        const errors = {};
        if (rating === 0) {
            errors.rating = '필수 입력항목입니다';  // 별점이 없으면 에러 표시
        }
        if (!reviewText.trim()) {
            errors.reviewText = '필수 입력항목입니다';  // 리뷰가 없으면 에러 표시
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;  // 에러가 없으면 true 반환
    };

    // AWS S3에 파일 업로드
    const uploadImageToS3 = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        // 업로드를 처리하는 API 엔드포인트로 요청
        const response = await fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('이미지 업로드에 실패했습니다.');
        }

        const data = await response.json();
         // 반환된 이미지 URL 확인을 위한 로그
         console.log('S3에서 반환된 이미지 URL:', data.imageUrl);
        return data.imageUrl; // S3에서 반환된 이미지 URL
    };

    // 사진을 선택하고 S3에 업로드한 후 상태에 저장
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedImageUrls = await Promise.all(files.map(async (file) => {
            return await uploadImageToS3(file); // S3에 업로드
        }));

        setSelectedImages((prevImages) => [...prevImages, ...uploadedImageUrls]); // S3에서 반환된 URL들을 상태에 저장
    };

    // 특정 사진 삭제 함수
    const handleImageRemove = (indexToRemove) => {
        setSelectedImages(selectedImages.filter((_, index) => index !== indexToRemove));
    };

    // 제출 버튼
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;  // 폼 검증에 실패하면 제출 중단
        }
        const reviewData = {
            productId,  
            rating,
            reviewText,
            tipText,
            images: selectedImages, // S3에 저장된 이미지 URL들을 보냄
            createdAt: new Date().toISOString()
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
                                    <h1>{product.title}</h1>
                                </Row>
                                <Row>
                                    <div>{product.description}</div>
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
                            <Form.Label>별점{formErrors.rating && <div style={{ color: 'red' }}>{formErrors.rating}</div>}</Form.Label>
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
                            {formErrors.reviewText && <div style={{ color: 'red' }}>{formErrors.reviewText}</div>}
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
