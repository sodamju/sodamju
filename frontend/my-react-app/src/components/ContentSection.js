import React from 'react';
import './ContentSection.css';
import bottleImage from '../assets/images/logo2.png'; // 이미지 import

function ContentSection() {
  return (
    <section className="content-section">
      <img className="image-placeholder" src={bottleImage} alt="한국 전통주" />
      <div className="text-content">
        <h3>마음을 담다, 소담주</h3>
        <h4>각 잔에 담긴 정성과 풍요로움을 경험하세요.</h4>
        <p> '소담', 한국어로 '생김새가 탐스럽다'는 뜻을 가진 이 말처럼, 우리의 술은 눈을 즐겁게 하는 아름다움과 입안 가득 퍼지는 풍성한 맛의 조화를 선사합니다.</p>
        <p>새로운 만남, 소중한 사람들과의 따뜻한 대화, 모든 것이 더욱 의미있고 기억에 남도록 '소담주'가 여러분과 함께합니다</p>
      </div>
    </section>
  );
}

export default ContentSection;