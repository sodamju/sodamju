import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import lv3 from '../assets/images/lv3.png';

const FavoritesCardComponent = ({title, content}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return(
        <Card>
            <Card.Img variant="top" src={lv3} width="100" height="200"/>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{title}</Card.Title>
                    </Col>
                    <Col className='text-end'>
                        <Button variant="light" onClick={toggleFavorite}>
                        {isFavorited ? '❤️' : '♡'}
                        </Button>
                    </Col>
                </Row>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
  );
};
  
  export default FavoritesCardComponent;