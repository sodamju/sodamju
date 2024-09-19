import React from 'react';
import './ContentSection.css';
import bottleImage from '../assets/images/bottle.webp'; // 이미지 import

function ContentSection() {
  return (
    <section className="content-section">
      <img className="image-placeholder" src={bottleImage} alt="한국 전통주" />
      <div className="text-content">
        <h3>한국의 전통주</h3>
        <h4>시간을 담은 맛과 멋</h4>
        <p>한국의 전통주는 다양한 원료와 독특한 발효 기술을 바탕으로 한 오랜 역사를 자랑합니다. 막걸리, 소주, 청주, 그리고 과실주와 같은 다양한 종류가 있으며, 각각의 술은 그 지역의 특색과 전통을 반영합니다.</p>
        <p>한국의 전통주는 그 제조 방법과 종류, 맛에서 보여주는 다양성으로 많은 사람들에게 사랑받고 있으며, 한국 문화의 중요한 부분을 이루고 있습니다. 전통주는 그 자체로도 예술이며, 한국인의 삶과 밀접하게 연관되어 있습니다...</p>
      </div>
    </section>
  );
}

export default ContentSection;