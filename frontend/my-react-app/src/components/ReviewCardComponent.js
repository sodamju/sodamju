import React, { useState } from 'react';
import { Card, Modal, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import './ReviewCardComponent.css';


const ReviewCardComponent = ({ productId, review, onDetailClick, setReviews, reviews }) => {
  const navigate = useNavigate();  // 페이지 이동을 위한 네비게이트
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);  // 모달 상태
  const [selectedImages, setSelectedImages] = useState([]);  // 선택한 이미지들
  const [imageIndex, setImageIndex] = useState(0);  // 현재 보여지는 이미지 인덱스

  // 날짜 포맷 변환 함수 (년/월/일 형식)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

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
    navigate(`/review/${productId}/edit/${reviewId}`);
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
    <Card className='reviewCard'>
      <Card.Body className='actionBtn'>
        {user && user.id === review.review.userId && (
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
         <Card.Title onClick={() =>onDetailClick(review.review.productId)} style={{ cursor: 'pointer'}} >{review.title}</Card.Title>
        <Card.Text>
          <div className="review-header">
            <span className="review-date">{formatDate(review.review.createdAt)}</span>  {/* 날짜 포맷 */}
            <span className="review-rating">{"★".repeat(review.review.rating)}</span> {/* 별점 표시 */}
          </div>
          
          <p>{review.review.reviewText}</p>  {/* 리뷰 내용 */}
          {review.review.tipText && <p className='tip'><FontAwesomeIcon className='lightBulb' icon={faCheckCircle}/> <strong>꿀팁!</strong><br/>{review.review.tipText}</p>}  {/* 꿀팁 내용 (있을 경우에만) */}
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
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCardComponent;
