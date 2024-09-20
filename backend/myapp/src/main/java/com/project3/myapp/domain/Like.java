package com.project3.myapp.domain;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "likes")
public class Like {

    @Id
    private String id;
    private String memberId;
    private String alcoholId;
    private LocalDateTime likedAt = LocalDateTime.now();  // 좋아요 시점 자동 설정

    // 기본 생성자
    public Like() {}

    // 생성자: memberId와 alcoholId로 좋아요 객체 생성
    public Like(String alcoholId, String memberId) {
        this.alcoholId = alcoholId;
        this.memberId = memberId;
    }

    // Getter, Setter
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMemberId() {
        return this.memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getAlcoholId() {
        return this.alcoholId;
    }

    public void setAlcoholId(String alcoholId) {
        this.alcoholId = alcoholId;
    }

    public LocalDateTime getLikedAt() {
        return this.likedAt;
    }

    public void setLikedAt(LocalDateTime likedAt) {
        this.likedAt = likedAt;
    }
}
