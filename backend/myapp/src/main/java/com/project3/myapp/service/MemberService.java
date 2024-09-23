package com.project3.myapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Member;
import com.project3.myapp.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    // 회원 저장 (회원가입)
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    // 중복체크로직 
    public Boolean isEmailRegistered(String email){
        return memberRepository.existsByEmail(email);
    }

    // 로그인 처리 (이메일과 비밀번호로 사용자 인증)
    public Member loginMember(String email, String password) {
        // 이메일로 회원을 찾음
        Member member = memberRepository.findByEmail(email);
        if (member != null && member.getPassword().equals(password)) {
            System.out.println("Logged in Member ID: " + member.getId()); // 로그인한 사용자의 ID 확인
            // 비밀번호가 일치하면 로그인 성공
            return member;
        }
        return null; // 인증 실패
    }

    // 사용자 정보 조회
    public Member getMemberById(String id) {
        return memberRepository.findById(id).orElse(null);
    }

    //로그인 토큰 생성
    public String generateTokenForMember(Member member) {
        // 간단한 토큰 생성 (이 예시에서는 사용자 ID와 시간 기반의 임의 토큰을 사용)
        return member.getId() + "_" + System.currentTimeMillis();
    }

    // 사용자 정보 수정
    public Member updateMember(String id, Member updatedMember) {
        Member existingMember = memberRepository.findById(id).orElse(null);
        if (existingMember != null) {
            existingMember.setNickname(updatedMember.getNickname());
            existingMember.setAgeGroup(updatedMember.getAgeGroup());
            existingMember.setLevel(updatedMember.getLevel());
            // 필요한 다른 필드도 추가
            return memberRepository.save(existingMember);
        }
        return null;
    }
}
