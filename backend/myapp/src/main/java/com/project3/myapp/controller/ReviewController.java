package com.project3.myapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project3.myapp.domain.Review;
import com.project3.myapp.serviece.ReviewService;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;;

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    // 특정 productId에 해당하는 리뷰 목록 반환
    @GetMapping
    public List<Review> getReviewsByProductId(@RequestParam String productId) {
        return reviewService.getReviewsByProductId(productId);
    }
}
