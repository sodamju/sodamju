package com.project3.myapp.serviece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Review;
import com.project3.myapp.repository.ReviewRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // 특정 productId에 해당하는 리뷰 목록 조회
    public List<Review> getReviewsByProductId(String productId) {
        return reviewRepository.findByProductId(productId);
    }

    // 리뷰 저장
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    // 리뷰 ID로 특정 리뷰 찾기
    public Optional<Review> findById(String id) {
        return reviewRepository.findById(id);  // Optional로 반환
    }

    // 리뷰 삭제
    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }
}
