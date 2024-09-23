// SearchSection.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams로 URL에서 검색어 가져오기
import './SearchSection.css';
import CategoryButtonComponent from './CategoryButtonComponent';
import AlcoholCardComponent from './AlcoholCardComponent';
import axiosInstance from '../api/myApi';

function SearchSection() {
  const { searchTerm } = useParams();  // URL에서 검색어 가져오기
  const [alcohols, setAlcohols] = useState([]);  // 전통주 목록 상태 저장
  const [category, setCategory] = useState('전체');  // 카테고리 기본 설정: '전체'
  const [sortOption, setSortOption] = useState('likes');  // 기본 정렬 기준: '좋아요 순'
  const [filteredAlcohols, setFilteredAlcohols] = useState([]);  // 필터링된 전통주 목록 저장
  const navigate = useNavigate();

  // API 호출을 통해 데이터를 가져오는 함수
  const fetchAlcohols = async () => {
    try {
      let url = '';
      
      // 정렬 옵션에 따라 다른 API 엔드포인트를 사용
      if (sortOption === 'likes') {
        url = `alcohols/sorted-by-likes?category=${category === '전체' ? '' : category}`;
      } else if (sortOption === 'reviews') {
        url = `alcohols/sorted-by-reviews?category=${category === '전체' ? '' : category}`;
      }

      const response = await axiosInstance.get(url);
      setAlcohols(response.data);  // 데이터를 상태로 저장
    } catch (error) {
      console.error('Error fetching alcohols:', error);
    }
  };

  // 카테고리 및 정렬 옵션 변경 시 데이터를 새로 가져옴
  useEffect(() => {
    fetchAlcohols();
  }, [category, sortOption]);

  // 검색어에 따른 필터링 함수
  const filterBySearchTerm = () => {
    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase();
      const filtered = alcohols.filter(alcohol =>
        alcohol.title.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchTerm)
      );
      setFilteredAlcohols(filtered);
    } else {
      setFilteredAlcohols(alcohols);  // 검색어가 없으면 전체 리스트 출력
    }
  };

  // 검색어가 변경될 때마다 필터링 실행
  useEffect(() => {
    filterBySearchTerm();
  }, [searchTerm, alcohols]);

  // 카테고리 버튼 클릭 시 호출되는 함수
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
        <h5>{searchTerm ? `"${searchTerm}"의 검색결과 (${filteredAlcohols.length}건)` : `'${category === '' ? '전체' : category} 결과(${filteredAlcohols.length}건)'`}</h5>
        {/* 정렬 옵션 선택 버튼 */}
        <div className="sort-buttons">
          <button onClick={() => setSortOption('likes')}>좋아요 순</button>
          <button onClick={() => setSortOption('reviews')}>리뷰 순</button>
        </div>

        <CategoryButtonComponent category={category} onCategoryClick={handleCategoryClick} />
        {/* 좋아요 순, 리뷰순 정렬 기능 추가 하고 싶음 */}
        {/* 검색 결과 리스트 */}
        <AlcoholCardComponent alcohols={filteredAlcohols} onDetailClick={handleDetailClick} />
      </div>
    </section>
  );
}

export default SearchSection;
