import React from 'react';
import { Card } from 'react-bootstrap';
import './ReviewCardComponent.css'

const ReviewCardComponent = ({ authorship }) => (
    <Card className='reviewCard'>
      <Card.Body>
        <Card.Title>글제목</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">글쓴이</Card.Subtitle>
        <Card.Text>
          리뷰내용 미리보기 입니다.
        </Card.Text>
        {authorship ? (
            <>
                <Card.Link href="#">수정</Card.Link>
                <Card.Link href="#">삭제</Card.Link>
            </>
            ) : (
                <Card.Link href="#">좋아요취소</Card.Link>
        )}
      </Card.Body>
    </Card>
  );
  
  export default ReviewCardComponent;