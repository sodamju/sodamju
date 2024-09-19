package com.project3.myapp.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // 파일 업로드를 위한 MultipartFile 사용
import com.project3.myapp.serviece.MemberService;
import com.project3.myapp.serviece.S3Service;
import com.project3.myapp.domain.Member;



@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody Member member) {
        
        Member savedMember = memberService.saveMember(member);

        return ResponseEntity.ok(savedMember);
    }
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody Member loginRequest) {
        // 이메일과 비밀번호로 사용자 인증
        Member loggedInMember = memberService.loginMember(loginRequest.getEmail(), loginRequest.getPassword());

        if (loggedInMember != null) {
            System.out.println("Returning Member with ID: " + loggedInMember.getId()); // 반환되는 Member 객체의 ID 확인
            // 로그인 성공 시 사용자 정보 반환
            return ResponseEntity.ok(loggedInMember);
        } else {
            // 로그인 실패 시 401 Unauthorized 반환
            return ResponseEntity.status(401).build();
        }
    }

    // 사용자 정보 조회 (로그인한 사용자의 정보 가져오기)
    @GetMapping("/{id}")
    public ResponseEntity<Member> getUserInfo(@PathVariable String id) {
        Member member = memberService.getMemberById(id);
        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 사용자 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateUserInfo(@PathVariable String id, @RequestBody Member updatedMember) {
        Member member = memberService.updateMember(id, updatedMember);
        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // 프로필 이미지 URL 업데이트
    @PutMapping("/{id}/profile-image")
    public ResponseEntity<?> updateProfileImage(@PathVariable String id, @RequestBody  Map<String, String> profileImageUrl) {
        try {
            // 회원 조회
            Member member = memberService.getMemberById(id);
            if (member != null) {
                // 프로필 이미지 URL 업데이트
                member.setProfileImageUrl(profileImageUrl.get("profileImageUrl"));
                memberService.saveMember(member);  // 업데이트된 회원 정보 저장

                // 업데이트된 회원 정보 반환
                return ResponseEntity.ok(member);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 이미지 업데이트 실패");
        }
    }


}
