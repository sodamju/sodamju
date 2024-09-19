package com.project3.myapp.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "members")
public class Member {
    
    @Id
    private String id;
    private String email;
    private String password;
    private String nickname;
    private String ageGroup;
    private String level;
	private String profileImageUrl;  // 이미지 경로 필드 추가

    // 기본 생성자
    public Member() {}

    // 생성자
    public Member(String email, String password, String nickname, String ageGroup, String level, String profileImageUrl) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.ageGroup = ageGroup;
        this.level = level;
		this.profileImageUrl = profileImageUrl;
    }

    // getter와 setter 추가

	// ID에 대한 Getter 추가
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
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

	public String getProfileImageUrl() {
        return profileImageUrl;
    }

	public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}
