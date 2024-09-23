package com.project3.myapp.controller;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import com.project3.myapp.domain.Member;
import com.project3.myapp.service.MemberService;
import jakarta.servlet.http.Cookie;




@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody Member member) {
        
        Member savedMember = memberService.saveMember(member);

        return ResponseEntity.ok(savedMember);
    }

    // 이메일 중복 체크
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
         boolean exists = memberService.isEmailRegistered(email);
        return ResponseEntity.ok(exists);
    }
    
    // 로그인 엔드포인트
    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody Member loginRequest, HttpServletResponse response) {
        Member loggedInMember = memberService.loginMember(loginRequest.getEmail(), loginRequest.getPassword());

        if (loggedInMember != null) {
            // 로그인 성공 시 토큰 생성
            String token = memberService.generateTokenForMember(loggedInMember);

            // 쿠키에 토큰 저장 (HttpOnly 속성으로 자바스크립트에서 접근 불가)
            Cookie cookie = new Cookie("auth_token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");  // 전체 경로에 쿠키 적용
            response.addCookie(cookie);

            return ResponseEntity.ok(loggedInMember);
        } else {
            // 로그인 실패 시 401 Unauthorized 반환
            return ResponseEntity.status(401).build();
        }
    }

    // 사용자 정보 조회
    @GetMapping("/me")
    public ResponseEntity<Member> getMyInfo(@CookieValue(value = "auth_token", defaultValue = "") String token) {
        System.out.println("Received token: " + token);  // 토큰 로그 출력

        if (!token.isEmpty()) {
            // 쿠키에서 받은 토큰으로 사용자 정보 조회
            String memberId = token.split("_")[0];  // 간단하게 토큰에서 ID 추출 (실제 구현에 맞게 수정)
            Member member = memberService.getMemberById(memberId);

            if (member != null) {
                return ResponseEntity.ok(member);
            }
        }
        return ResponseEntity.status(401).body(null);  // 인증 실패 시 401
    }

    // 로그아웃 엔드포인트
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // 로그아웃 시 쿠키 제거
        Cookie cookie = new Cookie("auth_token", "");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);  // 쿠키 삭제
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out");
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
