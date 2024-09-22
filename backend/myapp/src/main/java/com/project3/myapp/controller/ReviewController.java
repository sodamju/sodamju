package com.project3.myapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project3.myapp.domain.Alcohol;
import com.project3.myapp.domain.Member;
import com.project3.myapp.domain.Review;
import com.project3.myapp.dto.ReviewWithAlcohols;
import com.project3.myapp.dto.ReviewWithUserDetails;
import com.project3.myapp.service.AlcoholService;
import com.project3.myapp.service.MemberService;
import com.project3.myapp.service.ReviewService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private AlcoholService alcoholService;


    // 리뷰 생성
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }


    // 특정 productId에 해당하는 리뷰 목록 반환
    @GetMapping
    public List<ReviewWithUserDetails> getReviewsWithUserDetails(@RequestParam String productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        List<ReviewWithUserDetails> result = new ArrayList<>();

        for (Review review : reviews) {
            Member member = memberService.getMemberById(review.getUserId());
            if (member == null) {
                member = new Member("익명 사용자", "", "익명 사용자", "", "", "default-profile-url.jpg");
            }
            result.add(new ReviewWithUserDetails(review, member));
        }

        return result;
    }

    // 특정 userId에 해당하는 리뷰 목록 반환
    @GetMapping("/user-reviews")
    public List<ReviewWithAlcohols> getUserReviews(@RequestParam String userId) {
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        List<ReviewWithAlcohols> result = new ArrayList<>();

        for (Review review : reviews) {
            Alcohol alcohol = alcoholService.getAlcoholById(review.getProductId());
            result.add(new ReviewWithAlcohols(review, alcohol));
        }
        return result;
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
        Optional<Review> reviewOpt = reviewService.findById(id);
        if (!reviewOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Review review = reviewOpt.get();
        review.setRating(updatedReview.getRating());
        review.setReviewText(updatedReview.getReviewText());
        review.setTipText(updatedReview.getTipText());
        review.setImages(updatedReview.getImages());
        reviewService.saveReview(review); 
        return ResponseEntity.ok(review);
    }

    // 특정 리뷰를 ID로 가져오는 API
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable String id) {
        Optional<Review> reviewOpt = reviewService.findById(id);
        if (reviewOpt.isPresent()) {
            return ResponseEntity.ok(reviewOpt.get());  // 리뷰가 있으면 반환
        } else {
            return ResponseEntity.notFound().build();  // 없으면 404 반환
        }
    }

}
