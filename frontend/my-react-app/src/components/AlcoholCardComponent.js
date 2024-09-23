// AlcoholCardComponent.js
import React from 'react';
import './AlcoholCardComponent.css';

const AlcoholCardComponent = ({ alcohols, onDetailClick }) => {
  return (
    <div className="card-list">
      {alcohols.map((alcohol) => (
        <div className="card-style" key={alcohol.id}>
          <div className="card-image-placeholder">
            <img className='alcoholImg' src={alcohol.thumUrl} alt={alcohol.title} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{alcohol.title}</h3>
            <p className="card-body">{alcohol.description}</p>
            <button className="card-btn" onClick={() => onDetailClick(alcohol.id)}>자세히 보기</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlcoholCardComponent;
