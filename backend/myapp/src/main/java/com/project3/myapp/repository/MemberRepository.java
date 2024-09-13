package com.project3.myapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Member;


public interface MemberRepository extends MongoRepository<Member, String> {

}
