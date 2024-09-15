package com.project3.myapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "users")
public class User {
    @Id
    private String member_id;  // ObjectId를 String으로 사용
    private String email;
    private String password;
    private int achol_id;
    private int age;
    @CreatedDate
    private Date assign_date;  // 문서 생성 시간 자동 기록
    private String nickname;

    // 기본 생성자
    public User() {}

    // Getter와 Setter
    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAchol_id() {
        return achol_id;
    }

    public void setAchol_id(int achol_id) {
        this.achol_id = achol_id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getAssign_date() {
        return assign_date;
    }

    public void setAssign_date(Date assign_date) {
        this.assign_date = assign_date;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
