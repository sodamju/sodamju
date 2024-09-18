import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 사용하여 페이지 이동
import './CardSection.css';

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
    <section className="card-section">
      <div className='card-sec'>
        <h5>카테고리별 랭킹</h5>

        {/* 필터 버튼 영역 */}
        <div className="card-filter">
          <button className={`filter-btn ${category === '' ? 'active' : ''}`} onClick={() => handleCategoryClick('')}>
            전체
          </button>
          <button className={`filter-btn ${category === '탁주' ? 'active' : ''}`} onClick={() => handleCategoryClick('탁주')}>
            탁주
          </button>
          <button className={`filter-btn ${category === '증류주' ? 'active' : ''}`} onClick={() => handleCategoryClick('증류주')}>
            증류주
          </button>
          <button className={`filter-btn ${category === '과실주' ? 'active' : ''}`} onClick={() => handleCategoryClick('과실주')}>
            과실주
          </button>
          <button className={`filter-btn ${category === '청주' ? 'active' : ''}`} onClick={() => handleCategoryClick('청주')}>
            청주
          </button>
          <button className={`filter-btn ${category === '리큐르/기타' ? 'active' : ''}`} onClick={() => handleCategoryClick('리큐르/기타')}>
            리큐르/기타
          </button>
        </div>

        {/* 카드 리스트 영역 */}
        <div className="card-list">
          {alcohols.map((alcohol) => (
            <div className="card-style" key={alcohol.id}>
              <div className="card-image-placeholder">
                <img src={alcohol.thumUrl} alt={alcohol.title} /> {/* 이미지 매핑 */}
              </div>
              <div className="card-content">
                <h3 className="card-title">{alcohol.title}</h3> {/* 제목 매핑 */}
                <p className="card-body">{alcohol.description}</p> {/* 설명 매핑 */}
                <button className="card-btn" onClick={() => handleDetailClick(alcohol.id)}>자세히 보기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardSection;
