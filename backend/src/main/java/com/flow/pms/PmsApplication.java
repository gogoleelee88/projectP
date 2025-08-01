package com.flow.pms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * 프로젝트 관리 시스템 메인 애플리케이션 클래스
 * Flow와 같은 협업툴 시스템을 구현하기 위한 Spring Boot 애플리케이션
 */
@SpringBootApplication
@EnableJpaAuditing
public class PmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(PmsApplication.class, args);
        System.out.println("🚀 Project Management System이 시작되었습니다!");
        System.out.println("📊 대시보드: http://localhost:8080");
        System.out.println("🔧 API 문서: http://localhost:8080/swagger-ui.html");
    }
}