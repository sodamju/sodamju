package com.project3.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project3.myapp.service.LikeService;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/likes")
public class LikesController {
    @Autowired
    private final LikeService likeService;

    
    public LikesController(LikeService likeService) {
        this.likeService = likeService;
    }

    // 사용자가 특정 주류에 대해 좋아요를 눌렀는지 여부를 반환하는 엔드포인트
    @GetMapping("/{alcoholId}/status")
    public ResponseEntity<Map<String, Boolean>> getLikeStatus(@PathVariable String alcoholId, @RequestParam String memberId) {
        boolean liked = likeService.isLikedByUser(alcoholId, memberId);
        return ResponseEntity.ok(Collections.singletonMap("liked", liked));
    }

    // 특정 주류의 좋아요 수를 반환하는 엔드포인트
    @GetMapping("/{alcoholId}/count")
    public ResponseEntity<Map<String, Long>> getLikeCount(@PathVariable String alcoholId) {
        long likeCount = likeService.countLikesByAlcoholId(alcoholId);
        return ResponseEntity.ok(Collections.singletonMap("likeCount", likeCount));
    }

    // 좋아요 추가 엔드포인트
    @PostMapping("/{alcoholId}/like")
    public ResponseEntity<Void> likeAlcohol(@PathVariable String alcoholId, @RequestBody Map<String, String> body) {
        String memberId = body.get("memberId");
        likeService.addLike(alcoholId, memberId);
        return ResponseEntity.ok().build();
    }

    // 좋아요 취소 엔드포인트
    @PostMapping("/{alcoholId}/unlike")
    public ResponseEntity<Void> unlikeAlcohol(@PathVariable String alcoholId, @RequestBody Map<String, String> body) {
        String memberId = body.get("memberId");
        likeService.removeLike(alcoholId, memberId);
        return ResponseEntity.ok().build();
    }
}
