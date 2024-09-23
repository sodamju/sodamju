import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  
  return (
    <div className="productCard">
      <div className="topSection">
        <div className="image-Container">
          <img className='alcoholImg' src={product.thumUrl} alt={product.title} />  {/* 제품 이미지 */}
        </div>
        <div className="productDetails">
          <div className="category">
            <span>{product.category}</span>  {/* 카테고리 */}
          </div>
          <h2>{product.title}</h2>  {/* 주류 이름 */}
          <p>가격: 가격 정보를 여기에 추가하세요</p>
          <div className="likes">
            <span><FontAwesomeIcon icon={faHeart} /> 좋아요수 (리뷰수)</span>
          </div>
        </div>
      </div>
      <div className="description">
        <p className='description-title'>상품정보</p>
        <p><strong>도수</strong>: {product.abv}</p>
        <p><strong>규격</strong>: {product.volume}</p>
        <p><strong>주 원료</strong>: {product.ingredient}</p>
        <p><strong>제조사</strong>: {product.manufacture}</p>
      </div>
    </div>
  );
}

export default ProductCard;
