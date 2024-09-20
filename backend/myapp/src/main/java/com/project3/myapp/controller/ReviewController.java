package com.project3.myapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project3.myapp.domain.Review;
import com.project3.myapp.serviece.ReviewService;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // 리뷰 생성
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    // 특정 productId에 해당하는 리뷰 목록 반환
    @GetMapping
    public List<Review> getReviewsByProductId(@RequestParam String productId) {
        return reviewService.getReviewsByProductId(productId);
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable String id, @RequestHeader("userId") String userId) {
        Optional<Review> reviewOpt = reviewService.findById(id);
        if (reviewOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }

        Review review = reviewOpt.get();
        if (!review.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this review");
        }

        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }

    // 리뷰 수정
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Review updatedReview) {
        Optional<Review> reviewOpt = reviewService.findById(id); // reviewRepository 대신 reviewService 사용
        if (!reviewOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Review review = reviewOpt.get();
        review.setRating(updatedReview.getRating());
        review.setReviewText(updatedReview.getReviewText());
        review.setTipText(updatedReview.getTipText());
        review.setImages(updatedReview.getImages());
        reviewService.saveReview(review); // reviewRepository.save() 대신 reviewService.saveReview() 호출
        return ResponseEntity.ok(review);
    }

}
