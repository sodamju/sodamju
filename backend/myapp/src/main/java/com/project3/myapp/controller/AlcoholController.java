package com.project3.myapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project3.myapp.domain.Alcohol;
import com.project3.myapp.serviece.AlcoholService;
import java.util.List;

@RestController
@RequestMapping("/api/alcohols")
public class AlcoholController {

    @Autowired
    private AlcoholService alcoholService;

    @GetMapping
    public List<Alcohol> getAllAlcohols() {
        return alcoholService.getAllAlcohols();
    }

    //카테고리별 필터링
    @GetMapping("/category")
    public List<Alcohol> getAlcoholsByCategory(@RequestParam String category) {
        return alcoholService.getAlcoholsByCategory(category);
    }

    // 특정 제품의 세부 정보 반환
    @GetMapping("/{id}")
    public Alcohol getAlcoholById(@PathVariable String id) {
        return alcoholService.getAlcoholById(id);  // ID로 제품 정보 반환
    }

    // 검색 API: title을 기준으로 검색
    @GetMapping("/search")
    public List<Alcohol> searchAlcoholByTitle(@RequestParam("title") String title) {
        return alcoholService.searchAlcoholByTitle(title);
    }
}
