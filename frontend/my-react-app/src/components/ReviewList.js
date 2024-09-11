import React from 'react';
import './ReviewList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
function ReviewList() {
    // 예제 데이터입니다. 실제 데이터를 사용하시면 이 부분을 API 호출 등으로 대체하십시오.
    const reviews = [
        { title: "유저 이름", date: "00/00/00", rating: 4, body: "댓글 내용이 들어가는 부분입니다" },
        { title: "유저 이름", date: "00/00/00", rating: 5, body: "댓글 내용이 들어가는 부분입니다" },
        { title: "유저 이름", date: "00/00/00", rating: 3, body: "댓글 내용이 들어가는 부분입니다" },
        { title: "유저 이름", date: "00/00/00", rating: 2, body: "댓글 내용이 들어가는 부분입니다" },
        { title: "유저 이름", date: "00/00/00", rating: 5, body: "댓글 내용이 들어가는 부분입니다" }
    ];
    return (
        <div className="review">
            <div className="review-list">
                <div className='review-title'>
                    <p>리뷰  (리뷰수)</p>
                </div>
                {reviews.map((review, index) => (
                    <div className="review-item" key={index}>
                        <div className="review-header">
                            <div className='user-icon'>
                                <FontAwesomeIcon icon={faUserCircle} className="avatar" />
                            </div>
                            <div className="review-info">
                            <h4>{review.title}</h4>
                            <span className="review-date">{review.date}</span>
                            <span className="review-rating">{"★".repeat(review.rating)}</span>
                            </div>
                        </div>
                        <p>{review.body}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default ReviewList;