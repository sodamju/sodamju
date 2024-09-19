package com.project3.myapp.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project3.myapp.domain.Alcohol;
import java.util.List;

public interface AlcoholRepository extends MongoRepository<Alcohol, String> {
    List<Alcohol> findByCategory(String category);  // 카테고리로 필터링된 데이터 가져오기
    List<Alcohol> findByTitleContainingIgnoreCase(String title); //title로 검색된 데이터 가져오기
}
