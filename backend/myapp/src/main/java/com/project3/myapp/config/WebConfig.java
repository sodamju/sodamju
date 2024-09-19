package com.project3.myapp.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
            // 리소스 핸들러 설정 추가

            @Value("${file.upload-dir}")
            private String uploadDir;

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                // "/uploads/**"로 시작하는 요청은 서버의 파일 시스템에서 "file:///C:/Uploads/"에서 파일을 찾음
                registry.addResourceHandler("/uploads/**")
                        .addResourceLocations("classpath:/static/uploads/");
            }
        };
    }
}