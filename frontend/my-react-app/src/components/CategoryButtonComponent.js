// CategoryButtonComponent.js
import React from 'react';

const CategoryButtonComponent = ({ category, onCategoryClick }) => {
  return (
    <div className="card-filter">
      <button className={`filter-btn ${category === '' ? 'active' : ''}`} onClick={() => onCategoryClick('')}>
        전체
      </button>
      <button className={`filter-btn ${category === '탁주' ? 'active' : ''}`} onClick={() => onCategoryClick('탁주')}>
        탁주
      </button>
      <button className={`filter-btn ${category === '증류주' ? 'active' : ''}`} onClick={() => onCategoryClick('증류주')}>
        증류주
      </button>
      <button className={`filter-btn ${category === '과실주' ? 'active' : ''}`} onClick={() => onCategoryClick('과실주')}>
        과실주
      </button>
      <button className={`filter-btn ${category === '청주' ? 'active' : ''}`} onClick={() => onCategoryClick('청주')}>
        청주
      </button>
      <button className={`filter-btn ${category === '리큐르/기타' ? 'active' : ''}`} onClick={() => onCategoryClick('리큐르/기타')}>
        리큐르/기타
      </button>
    </div>
  );
};

export default CategoryButtonComponent;
