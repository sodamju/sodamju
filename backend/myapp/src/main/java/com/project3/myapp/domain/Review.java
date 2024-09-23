package com.project3.myapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "reviews")
public class Review {

    @Id
    private String id;
    private String alcoholId;
    private String userId;  // 사용자 ID를 추가
    private int rating;
    private String reviewText;
    private String tipText;
    private List<String> images;
    private Date createdAt;  // 리뷰 작성 날짜 및 시간 필드 추가

    // 생성자, getter 및 setter
    public Review() {}

    public Review(String alcoholId, String userId, int rating, String reviewText, String tipText, List<String> images, Date createdAt) {
        this.alcoholId = alcoholId;
        this.userId = userId;
        this.rating = rating;
        this.reviewText = reviewText;
        this.tipText = tipText;
        this.images = images;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAlcoholId() {
        return alcoholId;
    }

    public void setAlcoholId(String alcoholId) {
        this.alcoholId = alcoholId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
