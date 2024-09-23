package com.project3.myapp.dto;
import com.project3.myapp.domain.Member;
import com.project3.myapp.domain.Review;


public class ReviewWithUserDetails {
    private Review review;
    private String nickname;
    private String profileImageUrl;
    private String ageGroup;
    private String level;

    public ReviewWithUserDetails(Review review, Member member) {
        this.review = review;
        this.nickname = member.getNickname();
        this.profileImageUrl = member.getProfileImageUrl();
        this.ageGroup = member.getAgeGroup();
        this.level =member.getLevel();
    }


    public Review getReview() {
        return this.review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImageUrl() {
        return this.profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getAgeGroup() {
        return this.ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public String getLevel() {
        return this.level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
