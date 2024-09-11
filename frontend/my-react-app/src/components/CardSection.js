import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 사용하여 페이지 이동
import './CardSection.css';

function CardSection({ showPagination = true }) {
  const navigate = useNavigate();  // useNavigate 훅 사용

  // "Next" 버튼을 클릭했을 때 호출될 함수
  const handleNextClick = () => {
    navigate('/ListPage');  // '/ListPage' 경로로 이동
  };

  // "Detail" 버튼 클릭했을 때 호출될 함수
  const handleDetailClick = () => {
    navigate('/DetailPage');  // '/DetailPage' 경로로 이동
  };

  return (
    <section className="card-section">

      <div className='card-sec'>

        <h5>카테고리별 랭킹</h5>

          <div className="card-filter">
            <button className="filter-btn active">문제선택</button>
            <button className="filter-btn">학주</button>
            <button className="filter-btn">중주주</button>
            <button className="filter-btn">Label</button>
            <button className="filter-btn">Label</button>
            <button className="filter-btn">Label</button>
            <button className="filter-btn">Label</button>
          </div>

          <div className="card-list">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div className="card-style" key={index}>
                <div className="card-image-placeholder">Image</div>
                <div className="card-content">
                  <h3 className="card-title">Title</h3>
                  <p className="card-body">
                    Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
                  </p>
                  <button className="card-btn" onClick={handleDetailClick}>자세히 보기</button>
                </div>
              </div>
            ))}
          </div>

          {showPagination && (
            <div className="pagination">
              <button className="pagination-btn" onClick={handleNextClick}>Next</button>
            </div>
          )}
      </div>
    </section>
  );
}

export default CardSection;