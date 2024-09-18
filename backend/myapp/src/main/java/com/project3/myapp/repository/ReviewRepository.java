package com.project3.myapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Review;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByProductId(String productId);
}
