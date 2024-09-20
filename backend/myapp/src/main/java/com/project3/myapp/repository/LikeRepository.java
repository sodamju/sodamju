package com.project3.myapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Like;

public interface LikeRepository extends MongoRepository<Like, String> {
    // 특정 사용자가 주류에 대해 좋아요를 눌렀는지 확인하는 메서드
    boolean existsByAlcoholIdAndMemberId(String alcoholId, String memberId);

    // 특정 사용자가 주류에 대해 좋아요를 취소할 때 사용
    void deleteByAlcoholIdAndMemberId(String alcoholId, String memberId);

    // 주류 ID를 기준으로 좋아요 수를 계산하는 메서드
    long countByAlcoholId(String alcoholId);
}
