import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButtonComponent from './CategoryButtonComponent';
import AlcoholCardComponent from './AlcoholCardComponent';
import './SearchSection.css';
import axiosInstance from '../api/myApi';

function RankSection() {
  const [alcohols, setAlcohols] = useState([]);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const fetchAlcohols = async (selectedCategory) => {
    try {
      const url = `alcohols/sorted-by-likes?category=${category === '전체' ? '' : category}`;

      const response = await axiosInstance.get(url);
      setAlcohols(response.data);  // 데이터를 상태로 저장
    } catch (error) {
      console.error('Error fetching alcohols:', error);
    }
  };

  useEffect(() => {
    fetchAlcohols(category);
  }, [category]);

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleDetailClick = (id) => {
    navigate(`/DetailPage/${id}`);
  };

  // 각 카테고리별로 좋아요 순으로 정렬 후 상위 10개만 가져오는 함수
  const getTopRankedAlcohols = (alcohols, selectedCategory) => {
    const filteredAlcohols = selectedCategory 
      ? alcohols.filter((alcohol) => alcohol.category === selectedCategory)
      : alcohols;

    // 좋아요 총합으로 내림차순 정렬하고 상위 10개 추출
    return filteredAlcohols
      .slice(0, 10);
  };

  // 선택한 카테고리의 상위 10개 상품 가져오기
  const topRankedAlcohols = getTopRankedAlcohols(alcohols, category);

  const handleRankAllClick = () => {
    navigate(`/RankAll`);
  };

  return (
    <section className="card-section">
      <div className='card-sec'>
        <h5>카테고리별 랭킹</h5>
        <CategoryButtonComponent category={category} onCategoryClick={handleCategoryClick} />
        <button className='btn All-btn' onClick={handleRankAllClick}>
          전체 보러가기
        </button>
        <AlcoholCardComponent alcohols={topRankedAlcohols} onDetailClick={handleDetailClick} />
      </div>
    </section>
  );
}

export default RankSection;
