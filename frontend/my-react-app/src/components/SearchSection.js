// SearchSection.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams로 URL에서 검색어 가져오기
import './SearchSection.css';
import CategoryButtonComponent from './CategoryButtonComponent';
import AlcoholCardComponent from './AlcoholCardComponent';

function SearchSection() {
  const [alcohols, setAlcohols] = useState([]);  // 데이터 상태 저장
  const [filteredAlcohols, setFilteredAlcohols] = useState([]);  // 검색어로 필터링된 데이터 저장
  const [category, setCategory] = useState('');  // 필터링을 위한 카테고리 상태
  const { searchTerm } = useParams();  // URL에서 검색어 가져옴
  const navigate = useNavigate();

  // 카테고리 또는 검색어로 필터링된 데이터를 가져오는 함수
  const fetchAlcohols = async () => {
    const url = category 
      ? `http://localhost:8080/api/alcohols/category?category=${category}` 
      : `http://localhost:8080/api/alcohols`;

    const response = await fetch(url);
    const data = await response.json();
    setAlcohols(data);  // 가져온 데이터를 상태로 저장
  };

  // 검색어와 카테고리로 필터링
  const filterBySearchTerm = (data) => {
    if (searchTerm) {
      // 검색어와 띄어쓰기를 제거한 후 검색 (대소문자 구분 없이)
      const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase();
      return data.filter(alcohol =>
        alcohol.title.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchTerm)
      );
    }
    return data;
  };

  useEffect(() => {
    fetchAlcohols();
  }, [category]);

  useEffect(() => {
    // alcohols 데이터를 검색어로 필터링
    if (alcohols.length > 0) {
      const filteredData = filterBySearchTerm(alcohols);
      setFilteredAlcohols(filteredData);
    }
  }, [alcohols, searchTerm]);

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
        {/* 검색 결과 타이틀 */}
        <h5>{searchTerm ? `"${searchTerm}"의 검색결과 (${filteredAlcohols.length}건)` : '전체 결과'}</h5>
        
        {/* 카테고리 필터 버튼 */}
        <CategoryButtonComponent category={category} onCategoryClick={handleCategoryClick} />
        
        {/* 검색 결과 리스트 */}
        <AlcoholCardComponent alcohols={filteredAlcohols} onDetailClick={handleDetailClick} />
      </div>
    </section>
  );
}

export default SearchSection;
