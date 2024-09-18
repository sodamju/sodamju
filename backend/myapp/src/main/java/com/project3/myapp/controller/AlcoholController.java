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

    @GetMapping("/category")
    public List<Alcohol> getAlcoholsByCategory(@RequestParam String category) {
        return alcoholService.getAlcoholsByCategory(category);
    }
}
