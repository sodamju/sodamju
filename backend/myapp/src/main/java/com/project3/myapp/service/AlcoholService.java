package com.project3.myapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project3.myapp.domain.Alcohol;
import com.project3.myapp.repository.AlcoholRepository;
import java.util.List;

@Service
public class AlcoholService {

    @Autowired
    private AlcoholRepository alcoholRepository;

    public List<Alcohol> getAlcoholsByCategory(String category) {
        return alcoholRepository.findByCategory(category);  // 카테고리로 필터링된 데이터 반환
    }

    public List<Alcohol> getAllAlcohols() {
        return alcoholRepository.findAll();  // 모든 데이터 반환
    }

    public Alcohol getAlcoholById(String id) {
        return alcoholRepository.findById(id).orElse(null);  // ID로 제품 정보 가져오기
    }

    // 제목을 기준으로 검색
    public List<Alcohol> searchAlcoholByTitle(String title) {
        String normalizedTitle = title.replaceAll("\\s+", "").toLowerCase();  // 공백 제거, 소문자로 변환
        return alcoholRepository.findByTitleContainingIgnoreCase(normalizedTitle);
    }

    // 좋아요 순으로 정렬된 전통주 목록 반환 (기본)
    public List<Alcohol> getAlcoholsSortedByLikes(String category) {
        if (category == null || category.isEmpty()) {
            return alcoholRepository.findAllAlcoholsSortedByLikes();  // 전체 정렬
        }
        return alcoholRepository.findByCategorySortedByLikes(category);  // 카테고리 정렬
    }

    // 리뷰 순으로 정렬된 전통주 목록 반환
    public List<Alcohol> getAlcoholsSortedByReviews(String category) {
        if (category == null || category.isEmpty()) {
            return alcoholRepository.findAllAlcoholsSortedByReviews();  // 전체 정렬
        }
        return alcoholRepository.findByCategorySortedByReviews(category);  // 카테고리 정렬
    }
}


