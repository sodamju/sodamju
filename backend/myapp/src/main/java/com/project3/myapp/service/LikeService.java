package com.project3.myapp.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Alcohol;
import com.project3.myapp.domain.Like;
import com.project3.myapp.repository.AlcoholRepository;
import com.project3.myapp.repository.LikeRepository;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    @Autowired
    private AlcoholRepository alcoholRepository;

    // 특정 주류에 대해 좋아요 수를 반환하는 메서드
    public long countLikesByAlcoholId(String alcoholId) {
        return likeRepository.countByAlcoholId(alcoholId);
    }

    // 특정 사용자가 좋아요를 누른 목록
    public List<Alcohol> getMemberLikedAlcohols(String memberId) {
        // memberId로 좋아요 리스트
        List<Like> likes = likeRepository.findByMemberId(memberId);
        // 좋아요의 alcoholId 들을 추출하여 목록으로
        List<String> alcoholIds = likes.stream()
                                        .map(Like::getAlcoholId)
                                        .collect(Collectors.toList());
        // alcoholId들을 alcohol에서 모두 조회하여 반환
        return alcoholRepository.findByIdIn(alcoholIds);
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
