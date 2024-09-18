package com.project3.myapp.serviece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Review;
import com.project3.myapp.repository.ReviewRepository;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // 특정 productId에 해당하는 리뷰 목록 조회
    public List<Review> getReviewsByProductId(String productId) {
        return reviewRepository.findByProductId(productId);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}
