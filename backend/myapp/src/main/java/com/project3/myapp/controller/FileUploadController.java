package com.project3.myapp.controller;

import com.project3.myapp.serviece.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Collections;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class FileUploadController {

    private final S3Service s3Service;

    // @PostMapping
    // public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    //     try {
    //         String imageUrl = s3Service.uploadFile(file);
    //         return ResponseEntity.ok(imageUrl); // S3 URL 반환
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).body("File upload failed");
    //     }
    // }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = s3Service.uploadFile(file);  // S3 URL 반환
            System.out.println("이미지 URL: " + imageUrl);  // 로그 확인

            // URL을 JSON으로 반환
            return ResponseEntity.ok(Collections.singletonMap("imageUrl", imageUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패");
        }
    }

}
