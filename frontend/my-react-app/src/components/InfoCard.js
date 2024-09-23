import React from 'react';
import './InfoCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function InfoCard() {
  return (
    <div className='info-container'>
        <div className="info-card">
            <div className='info-title'>
            <FontAwesomeIcon icon={faInfoCircle} /> Info
            </div>
            <p>본 사이트에 게시된 전통주 이미지는 실제 상품과 다를 수 있으며, 커뮤니티 이용 시 예의를 지켜주시기 바랍니다.</p>
        </div>
    </div>
  );
}

export default InfoCard;
