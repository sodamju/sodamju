package com.project3.myapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // 파일 업로드를 위한 MultipartFile 사용
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.project3.myapp.serviece.MemberService;
import org.springframework.beans.factory.annotation.Value;
import com.project3.myapp.domain.Member;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


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

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 프로필 이미지 업로드
    @PostMapping("/{id}/upload-profile")
    public ResponseEntity<?> uploadProfileImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            // 회원 조회
            Member member = memberService.getMemberById(id);
            if (member != null) {
                // 파일 저장 경로 설정
                String filename = id + "_" + file.getOriginalFilename();
                Path path = Paths.get(uploadDir + "/" + filename);  // "uploads"는 서버의 파일 저장 디렉토리
                Files.write(path, file.getBytes());  // 파일 저장

                // 프로필 이미지 경로를 DB에 저장
                member.setProfileImageUrl("/uploads/" + filename);  // 이미지 URL 설정
                memberService.saveMember(member);  // 업데이트된 회원 정보 저장

                // 저장된 회원 정보 반환
                return ResponseEntity.ok(member);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // 회원이 없을 경우 404 반환
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");  // 에러 발생 시 500 반환
        }
    }
}
