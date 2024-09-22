package com.project3.myapp.dto;
import com.project3.myapp.domain.Alcohol;
import com.project3.myapp.domain.Review;


public class ReviewWithAlcohols {
    private Review review;
    private String title;

    public ReviewWithAlcohols(Review review, Alcohol alcohol) {
        this.review = review;
        this.title = alcohol.getTitle();
    }

    public Review getReview() {
        return this.review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
