package com.project3.myapp.serviece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Member;
import com.project3.myapp.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }
}
