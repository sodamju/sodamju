package com.project3.myapp.service;

import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Like;
import com.project3.myapp.repository.LikeRepository;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    // 특정 주류에 대해 좋아요 수를 반환하는 메서드
    public long countLikesByAlcoholId(String alcoholId) {
        return likeRepository.countByAlcoholId(alcoholId);
    }

    // 사용자가 특정 주류에 좋아요를 눌렀는지 확인하는 메서드
    public boolean isLikedByUser(String alcoholId, String memberId) {
        return likeRepository.existsByAlcoholIdAndMemberId(alcoholId, memberId);
    }

    // 좋아요 추가 메서드
    public void addLike(String alcoholId, String memberId) {
        if (!isLikedByUser(alcoholId, memberId)) {
            likeRepository.save(new Like(alcoholId, memberId));
        }
    }

    // 좋아요 취소 메서드
    public void removeLike(String alcoholId, String memberId) {
        if (isLikedByUser(alcoholId, memberId)) {
            likeRepository.deleteByAlcoholIdAndMemberId(alcoholId, memberId);
        }
    }
}
