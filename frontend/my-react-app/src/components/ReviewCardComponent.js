import React from 'react';
import { Card } from 'react-bootstrap';
import './ReviewCardComponent.css'


const ReviewCardComponent = ({ review, onDetailClick }) => {

  // 날짜 포맷 변환 함수 (년/월/일 형식)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <Card className='reviewCard'>
      <Card.Body>
         <Card.Title onClick={() =>onDetailClick(review.review.productId)} style={{ cursor: 'pointer'}} >{review.title}</Card.Title>
        <Card.Text>
          <div className="review-header">
            <span className="review-date">{formatDate(review.review.createdAt)}</span>  {/* 날짜 포맷 */}
            <span className="review-rating">{"★".repeat(review.review.rating)}</span> {/* 별점 표시 */}
          </div>
          <p>{review.review.reviewText}</p>  {/* 리뷰 내용 */}
          {review.review.tipText && <p><strong>Tip:</strong> {review.review.tipText}</p>}  {/* 꿀팁 내용 (있을 경우에만) */}
          {review.review.images && review.review.images.length > 0 && (
              <div className="review-images">
                  {review.review.images.map((imageUrl, index) => (
                      <img key={index} src={imageUrl} alt={`리뷰 이미지 ${index + 1}`} className="review-image" />
                  ))}
              </div>
          )}
        </Card.Text>
          <Card.Link href="#">수정</Card.Link>
          <Card.Link href="#">삭제</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ReviewCardComponent;
