import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // URL 파라미터와 페이지 이동을 위한 훅
import '../App.css';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import InfoCard from '../components/InfoCard';
import ReviewList from '../components/ReviewList';
import Footer from '../components/Footer';

function DetailPage() {
    const { productId } = useParams();  // URL에서 productId를 가져옴 (예: /DetailPage/:productId)
    const [product, setProduct] = useState(null);  // 제품 정보를 저장할 상태
    const navigate = useNavigate();  // 페이지 이동을 위한 훅

    // 제품 데이터를 백엔드에서 가져오는 함수
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/alcohols/${productId}`);
                if (!response.ok) {
                    throw new Error('제품 정보를 불러오지 못했습니다.');
                }
                const data = await response.json();
                setProduct(data);  // 제품 정보를 상태로 설정
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        
        fetchProductDetails();
    }, [productId]);

    // 리뷰 작성 페이지로 이동하는 함수
    const handleReviewClick = () => {
        navigate(`/review/${productId}`);  // URL에 productId 포함하여 리뷰 작성 페이지로 이동
    };

    return (
        <div className="content">
            <Header />
            {product && <ProductCard product={product} />}  {/* product 정보를 ProductCard로 전달 */}
            <InfoCard />
            <ReviewList />
            <button onClick={handleReviewClick} className="write-review-btn">
                리뷰 쓰기
            </button>
            <Footer />
        </div>
    );
}

export default DetailPage;
