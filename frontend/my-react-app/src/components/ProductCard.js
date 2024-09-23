import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ProductCard = ({ alcohol, isAuthenticated, user }) => {
  const [liked, setLiked] = useState(false);    // 좋아요 여부 상태
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태

  useEffect(() => {
    // 좋아요 수 가져오기
    axios.get(`/api/likes/${alcohol.id}/count`)
      .then(response => setLikeCount(response.data.likeCount))
      .catch(error => console.error(error));

    // 로그인된 사용자의 좋아요 상태 가져오기 (로그인했을 경우)
    if (isAuthenticated) {
      axios.get(`/api/likes/${alcohol.id}/status`, { params: { memberId: user.id } })
        .then(response => setLiked(response.data.liked))
        .catch(error => console.error(error));
    }
  }, [alcohol.id, isAuthenticated, user]);

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    const url = liked ? `/api/likes/${alcohol.id}/unlike` : `/api/likes/${alcohol.id}/like`;
    axios.post(url, { memberId: user.id })
      .then(() => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
      })
      .catch(error => console.error(error));
  };
  
  return (
    <div className="productCard">
      <div className="topSection">
        <div className="image-Container">
          <img className='alcoholImg' src={alcohol.thumUrl} alt={alcohol.title} />  {/* 제품 이미지 */}
        </div>
        <div className="productDetails">
          <div className="category">
            <span>{alcohol.category}</span>  {/* 카테고리 */}
          </div>
          <h2>{alcohol.title}</h2>  {/* 주류 이름 */}
          <p>{alcohol.description}</p>
          <div className="likes">
            <button 
                className={`likeButton ${liked ? 'liked' : ''}`} 
                onClick={handleLikeClick} 
                disabled={!isAuthenticated}
              >
                <FontAwesomeIcon 
                  icon={faHeart} 
                  style={{ color: liked ? 'red' : 'gray' }} 
                /> 
              </button>
              좋아요 {likeCount}
          </div>
        </div>
      </div>
      <div className="description">
        <p className='description-title'>상품정보</p>
        <p><strong>도수</strong>: {alcohol.abv}</p>
        <p><strong>규격</strong>: {alcohol.volume}</p>
        <p><strong>주 원료</strong>: {alcohol.ingredient}</p>
        <p><strong>제조사</strong>: {alcohol.manufacture}</p>
      </div>
    </div>
  );
}

export default ProductCard;
