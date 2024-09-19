import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 사용하여 페이지 이동
import './CardSection.css';
import CategoryButtonComponent from './CategoryButtonComponent';
import AlcoholCardComponent from './AlcoholCardComponent';


function CardSection() {
  const [alcohols, setAlcohols] = useState([]);  // 데이터 상태 저장
  const [category, setCategory] = useState('');  // 필터링을 위한 카테고리 상태
  const navigate = useNavigate();

  // 카테고리로 필터링된 데이터를 가져오는 함수
  const fetchAlcohols = async (selectedCategory) => {
    const url = selectedCategory 
      ? `http://localhost:8080/api/alcohols/category?category=${selectedCategory}` 
      : `http://localhost:8080/api/alcohols`;
    
    const response = await fetch(url);
    const data = await response.json();
    setAlcohols(data);  // 가져온 데이터를 상태로 저장
  };

  // 컴포넌트가 마운트될 때 모든 데이터를 가져옴
  useEffect(() => {
    fetchAlcohols(category);
  }, [category]);

  // 필터 버튼 클릭 시 호출되는 함수
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);  // 카테고리 상태 업데이트
  };

  // "Detail" 버튼 클릭 시 호출될 함수
  const handleDetailClick = (id) => {
    navigate(`/DetailPage/${id}`);  // 해당 항목의 상세 페이지로 이동
  };

  return (
    // 섹션영역
    <section className="card-section">
      <div className='card-sec'>
        <h5>카테고리별 랭킹</h5>
        <CategoryButtonComponent category={category} onCategoryClick={handleCategoryClick} />
        <AlcoholCardComponent alcohols={alcohols} onDetailClick={handleDetailClick} />
      </div>
    </section>
  );
}

export default CardSection;
