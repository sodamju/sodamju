package com.project3.myapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Member;


public interface MemberRepository extends MongoRepository<Member, String> {
    // 이메일로 회원을 조회하는 메서드
    Member findByEmail(String email);
    // 이메일 중복체크
    Boolean existsByEmail(String email);
}
