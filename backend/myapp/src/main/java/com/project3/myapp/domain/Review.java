package com.project3.myapp.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "reviews")
public class Review {

    @Id
    private String id;
    private String productId;  // 제품 ID를 추가
    private int rating;
    private String reviewText;
    private String tipText;
    private List<String> images;

    // 생성자, getter 및 setter
    public Review() {}

    public Review(String productId, int rating, String reviewText, String tipText, List<String> images) {
        this.productId = productId;
        this.rating = rating;
        this.reviewText = reviewText;
        this.tipText = tipText;
        this.images = images;
    }

    // Getters and Setters
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public String getTipText() {
        return tipText;
    }

    public void setTipText(String tipText) {
        this.tipText = tipText;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}
