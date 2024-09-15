import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // FontAwesome의 별 아이콘 사용

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }} // 라디오 버튼 숨기기
            />
            <FaStar
              size={30}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
