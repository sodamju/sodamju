import React from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ProductCard() {
  return (
    <div className="productCard">
      <div className="topSection">
        <div className="imageContainer">
          {/* 이미지가 표시될 부분 */}
        </div>
        <div className="productDetails">
            <div className='category'>
                <span>주류 카테고리</span>
            </div>
            <h2>주류 이름</h2>
            <p>가격이 들어가는 부분입니다</p>
            <div className="likes">
            <span><FontAwesomeIcon icon={faHeart} /> 좋아요수   (리뷰수)</span>
            </div>
        </div>
      </div>
      <div className="description">
            <p className='description-title'>상품정보</p>
            <p><strong>전통주 명</strong> : 전통주 이름이 들어가는 부분입니다.</p>
            <p><strong>도수</strong> : 도수가 들어가는 부분입니다.</p>
            <p><strong>규격</strong> : 규격이 들어가는 부분입니다.</p>
            <p><strong>주 원료</strong> : 주 원료가 들어가는 부분입니다.</p>
            <p><strong>제조사</strong> : 제조사가 들어가는 부분입니다.</p>
            
        </div>
        <div className='spec'>
        <p>Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</p>
        </div>
    </div>
  );
}

export default ProductCard;
