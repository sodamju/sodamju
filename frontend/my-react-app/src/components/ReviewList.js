import React, { useState, useEffect } from 'react';
import './ReviewList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function ReviewList({ productId }) {
    const [reviews, setReviews] = useState([]);  // 리뷰 데이터를 저장할 상태

    // 리뷰 데이터를 가져오는 함수
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/reviews?productId=${productId}`);
                if (!response.ok) {
                    throw new Error('리뷰 데이터를 가져오지 못했습니다.');
                }
                const data = await response.json();
                setReviews(data);  // 리뷰 데이터 설정
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [productId]);

    // 날짜 포맷 변환 함수 (년/월/일 형식)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <div className="review">
            <div className="review-list">
                <div className='review-title'>
                    <p>리뷰 ({reviews.length})</p>  {/* 리뷰 개수 표시 */}
                </div>
                {reviews.map((review, index) => (
                    <div className="review-item" key={index}>
                        <div className="review-header">
                            <div className='user-icon'>
                                <FontAwesomeIcon icon={faUserCircle} className="avatar" />
                            </div>
                            <div className="review-info">
                                <h4>{review.userName || "익명 사용자"}</h4> {/* 유저 이름이 있다면 표시, 없으면 "익명 사용자" */}
                                <span className="review-date">{formatDate(review.createdAt)}</span>  {/* 날짜 포맷 */}
                                <span className="review-rating">{"★".repeat(review.rating)}</span> {/* 별점 표시 */}
                            </div>
                        </div>
                        <p>{review.reviewText}</p>  {/* 리뷰 내용 */}
                        {review.tipText && <p><strong>Tip:</strong> {review.tipText}</p>}  {/* 꿀팁 내용 (있을 경우에만) */}
                        {review.images && review.images.length > 0 && (
                            <div className="review-images">
                                {review.images.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt={`리뷰 이미지 ${index + 1}`} className="review-image" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewList;
