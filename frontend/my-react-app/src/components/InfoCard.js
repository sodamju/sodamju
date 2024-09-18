import React from 'react';
import './InfoCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function InfoCard() {
  return (
    <div className='info-container'>
        <div className="info-card">
            <div className='info-title'>
            <FontAwesomeIcon icon={faInfoCircle} /> Info Title
            </div>
            <p>상품에 대한 추가적인 설명이 들어가는 부분입니다.</p>
        </div>
    </div>
  );
}

export default InfoCard;
