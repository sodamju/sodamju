import React, { useState, useEffect } from 'react';
import './ReviewList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Modal, Button, Image } from 'react-bootstrap';
import { faEdit,  faTimesCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위해 사용

function ReviewList({ alcoholId, onReviewClick }) {
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth();  // 현재 로그인한 사용자 정보
    const navigate = useNavigate();  // 페이지 이동을 위한 훅
    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);


    // 리뷰 데이터를 가져오는 함수
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/reviews?alcoholId=${alcoholId}`);
                if (!response.ok) {
                    throw new Error('리뷰 데이터를 가져오지 못했습니다.');
                }
                const data = await response.json();
                console.log("Fetched Reviews:", data); // 데이터를 로그로 출력
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [alcoholId]);

    // 리뷰 삭제 함수
    const handleDelete = async (reviewId) => {
        const confirmDelete = window.confirm('정말로 이 리뷰를 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'userId': user.id  // 삭제 시 사용자 ID 검증
                    },
                });
                if (response.ok) {
                    // 리뷰 삭제 후, 화면에서 해당 리뷰를 제거
                    setReviews(reviews.filter(review => review.id !== reviewId));
                    alert('리뷰가 성공적으로 삭제되었습니다.');
                } else {
                    alert('리뷰 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('리뷰 삭제 중 오류 발생:', error);
            }
        }
    };

    // 리뷰 수정 함수
    const handleEdit = (reviewId) => {
        navigate(`/review/${alcoholId}/edit/${reviewId}`);
    };

    // 날짜 포맷 변환 함수 (년/월/일 형식)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    };

    // 이미지 클릭했을 때
    const handleImageClick = (images, index) => {
        setSelectedImages(images);
        setImageIndex(index);
        setShowModal(true);
    };
    
    // 이미지 양옆 이동
    const handleNextImage = () => {
        if (imageIndex < selectedImages.length - 1) {
            setImageIndex(imageIndex + 1);
        }
    };
    
    const handlePrevImage = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    

    return (
        <div className="review">
            <div className="review-list">
                <div className='review-title'>
                    <p>리뷰 ({reviews.length})</p>  {/* 리뷰 개수 표시 */}
                    <button onClick={onReviewClick} className="write-review-btn">
                        <FontAwesomeIcon icon={faPen} className="write-icon" /> 리뷰 쓰기
                    </button>
                </div>
                {reviews.map((review) => (
                    <div className="review-item" key={review.id}>
                        <div className="review-header">
                            <div className='user-icon'>
                                <img className="avatar" src={review.profileImageUrl || "default-profile-url.jpg"} alt='profileImage'/>
                            </div>
                            <div className="review-info">
                                <h4>{review.nickname || "익명 사용자"}</h4>
                                <div className="review-badges">
                                    <Badge className='badge' bg="secondary">{review.ageGroup}대</Badge>
                                    <Badge className='badge' bg="secondary">lv.{review.level}</Badge>
                                </div>
                                <span className="review-date">{formatDate(review.review.createdAt)}</span>  {/* 날짜 포맷 */}
                                <span className="review-rating">{"★".repeat(review.review.rating)}</span> {/* 별점 표시 */}
                            </div>
                            {user && user.id === review.userId && (
                                <div className="review-actions">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => handleEdit(review.id)}
                                        className="action-icon"
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimesCircle}
                                        onClick={() => handleDelete(review.id)}
                                        className="action-icon"
                                    />
                                </div>
                            )}
                        </div>
                        <p>{review.review.reviewText}</p>  {/* 리뷰 내용 */}
                        {review.review.tipText && <p><strong>Tip:</strong> {review.review.tipText}</p>}  {/* 꿀팁 내용 (있을 경우에만) */}
                        {review.review.images && review.review.images.length > 0 && (
                            <div className="review-images">
                                {review.review.images.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`리뷰 이미지 ${index + 1}`} className="review-image" onClick={() => handleImageClick(review.review.images, index)} />
                                ))}
                            </div>
                        )}
                        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                            <Modal.Body>
                                <Image src={selectedImages[imageIndex]} alt="Selected Review Image" style={{ width: '100%' }} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handlePrevImage} disabled={imageIndex === 0}>
                                    이전
                                </Button>
                                <Button variant="primary" onClick={handleNextImage} disabled={imageIndex === selectedImages.length - 1}>
                                    다음
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewList;
