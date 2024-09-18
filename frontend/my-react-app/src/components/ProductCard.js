import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ProductCard() {
  const { id } = useParams();  // URL에서 id 파라미터 가져오기
  const [product, setProduct] = useState(null);  // 제품 데이터 상태

  // 백엔드에서 제품 데이터를 가져오는 함수
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/alcohols/${id}`);
      const data = await response.json();
      setProduct(data);  // 제품 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  // 데이터 로딩 중일 때
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="productCard">
      <div className="topSection">
        <div className="imageContainer">
          <img src={product.thumUrl} alt={product.title} />  {/* 제품 이미지 */}
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
        <p><strong>전통주 명</strong>: {product.title}</p>
        <p><strong>도수</strong>: {product.abv}</p>
        <p><strong>규격</strong>: {product.volume}</p>
        <p><strong>주 원료</strong>: {product.ingredient}</p>
        <p><strong>제조사</strong>: {product.manufacture}</p>
      </div>
    </div>
  );
}

export default ProductCard;
