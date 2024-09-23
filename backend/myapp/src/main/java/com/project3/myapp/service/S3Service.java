package com.project3.myapp.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 s3Client;

    private final String bucketName = "bucket-sipimg";

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        s3Client.putObject(bucketName, fileName, file.getInputStream(), metadata);

        // 파일의 S3 URL 반환
        return s3Client.getUrl(bucketName, fileName).toString();
    }
}
