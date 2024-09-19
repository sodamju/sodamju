package com.project3.myapp.config;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;

@Configuration
public class DotenvConfig {

    @PostConstruct
    public void loadEnv() {
        // .env 파일을 로드하여 시스템 환경 변수로 설정
        Dotenv dotenv = Dotenv.load();

        System.setProperty("AWS_ACCESS_KEY_ID", dotenv.get("AWS_ACCESS_KEY_ID"));
        System.setProperty("AWS_SECRET_ACCESS_KEY", dotenv.get("AWS_SECRET_ACCESS_KEY"));
        System.setProperty("AWS_REGION", dotenv.get("AWS_REGION"));
    }
}