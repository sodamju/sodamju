import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // URL 파라미터와 페이지 이동을 위한 훅
import '../App.css';
import ProductCard from '../components/ProductCard';
import InfoCard from '../components/InfoCard';
import ReviewList from '../components/ReviewList';
import { useAuth } from '../contexts/AuthContext';  // AuthContext에서 로그인 정보 가져오기


function DetailPage() {
    const { productId } = useParams();  // URL에서 productId를 가져옴 (예: /DetailPage/:productId)
    const [product, setProduct] = useState(null);  // 제품 정보를 저장할 상태
    const { isAuthenticated, user } = useAuth();  // 로그인 여부와 사용자 정보 확인
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

    //리뷰쓰기 버튼
    const handleReviewClick = () => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');  // 로그인 안 된 경우 경고창
            return;
        }
        navigate(`/review/${productId}`);  // 로그인된 경우 리뷰 작성 페이지로 이동
    };

    return (
        <div className="content">
            {product && (
                <ProductCard 
                    product={product} 
                    isAuthenticated={isAuthenticated} 
                    user={user}  // 로그인 상태와 사용자 정보를 ProductCard에 전달
                />
            )}
            <InfoCard />
            {product && <ReviewList onReviewClick={handleReviewClick} productId={productId} />}
        </div>
    );
}

export default DetailPage;
