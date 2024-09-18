package com.project3.myapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Review;

public interface ReviewRepository extends MongoRepository<Review, String> {
}
