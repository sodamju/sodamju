package com.project3.myapp.serviece;
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
}


