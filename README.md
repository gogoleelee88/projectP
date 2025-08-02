# Flow Project Management System

> 협업툴 전문 개발자를 꿈꾸는 LEES00의 프로젝트 관리 시스템 포트폴리오

![Flow PMS Banner](https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80)

## 🚀 프로젝트 소개

Flow PMS는 현대적인 협업툴의 핵심 기능들을 구현한 프로젝트 관리 시스템입니다. Spring Boot와 React를 기반으로 개발되었으며, 실제 협업툴 개발 경험을 바탕으로 사용자 중심의 인터페이스와 강력한 기능을 제공합니다.

### ✨ 주요 특징

- 🎨 **현대적인 UI/UX**: React + Tailwind CSS로 구현된 반응형 디자인
- 🔍 **통합 검색**: 프로젝트, 사용자, 메뉴를 통합 검색하는 스마트 검색 시스템
- 📊 **실시간 대시보드**: 프로젝트 현황을 한눈에 볼 수 있는 위젯 기반 대시보드
- 💬 **상태 관리**: 사용자 상태 메시지 및 프로필 관리
- 📱 **반응형 웹**: 모바일부터 데스크톱까지 최적화된 사용자 경험
- 🔗 **블로그 연동**: 개발 일지와 포트폴리오가 연동된 생생한 개발 스토리

## 🛠️ 기술 스택

### Backend
- **Java 17** - 최신 Java 기능 활용
- **Spring Boot 3.2** - 현대적인 백엔드 프레임워크
- **Spring Security** - 보안 및 인증
- **Spring Data JPA** - 데이터베이스 추상화
- **H2 Database** - 개발용 인메모리 데이터베이스
- **Maven** - 의존성 관리 및 빌드

### Frontend
- **React 18** - 최신 React 기능 활용
- **React Router DOM** - SPA 라우팅
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Lucide React** - 현대적인 아이콘 라이브러리
- **React Hot Toast** - 사용자 알림
- **Axios** - HTTP 클라이언트

### DevOps & Tools
- **Git** - 버전 관리
- **ESLint & Prettier** - 코드 품질 관리
- **Swagger/OpenAPI** - API 문서화

## 🏗️ 프로젝트 구조

```
project-management-system/
├── backend/                     # Spring Boot 백엔드
│   ├── src/main/java/com/flow/pms/
│   │   ├── config/             # 설정 클래스
│   │   ├── controller/         # REST API 컨트롤러
│   │   ├── service/            # 비즈니스 로직
│   │   ├── repository/         # 데이터 액세스
│   │   ├── entity/             # JPA 엔티티
│   │   └── dto/               # 데이터 전송 객체
│   └── src/main/resources/
│       ├── application.yml     # 설정 파일
│       └── data.sql           # 초기 데이터
├── frontend/                   # React 프론트엔드
│   ├── src/
│   │   ├── components/        # React 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── services/         # API 서비스
│   │   ├── hooks/            # 커스텀 훅
│   │   └── styles/           # 스타일 파일
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 시작하기

### 필수 요구사항

- Java 17 이상
- Node.js 16 이상
- Maven 3.6 이상

### 백엔드 실행

```bash
# 백엔드 디렉터리로 이동
cd backend

# 의존성 설치 및 애플리케이션 실행
mvn spring-boot:run

# 또는 JAR 파일 빌드 후 실행
mvn clean package
java -jar target/flow-pms.jar
```

백엔드 서버는 http://localhost:8080 에서 실행됩니다.

### 프론트엔드 실행

```bash
# 프론트엔드 디렉터리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

프론트엔드 서버는 http://localhost:3000 에서 실행됩니다.

## 📱 주요 기능

### 1. 대시보드
- 프로젝트 현황 요약
- 개인 업무 위젯
- 알림 및 메시지 센터
- 캘린더 통합
- 실시간 상태 업데이트

### 2. 프로젝트 관리
- 프로젝트 생성/수정/삭제
- 카테고리별 분류 (피드, 업무, 간트차트, 캘린더, 파일)
- 상태 관리 (예정, 진행중, 완료, 보류)
- 공개/비공개 설정

### 3. 통합 검색
- 실시간 검색 결과
- 카테고리별 필터링
- 검색 히스토리 관리
- 자동완성 기능

### 4. 사용자 관리
- 프로필 상태 메시지
- 아이콘 커스터마이징
- 활동 기록
- 권한 관리

### 5. 포트폴리오 연동
- 개발 블로그 연동
- 실제 프로젝트 경험 소개
- 기술 스택 및 성과 정리

## 🎯 핵심 가치

### "연결의 힘으로 일을 쉽고 빠르게"

이 프로젝트는 단순한 기술 데모가 아닌, **실제 협업툴 개발 경험**을 바탕으로 한 실용적인 시스템입니다.

#### 실제 경험 기반
- Flow 설명회 참석 및 분석
- 기존 협업툴의 UX 문제점 파악
- 사용자 중심의 개선사항 도출

#### 기술적 깊이
- RESTful API 설계 원칙 준수
- 컴포넌트 기반 아키텍처
- 반응형 웹 디자인
- 성능 최적화

#### 사용자 경험
- 직관적인 인터페이스
- 빠른 응답시간
- 접근성 고려
- 모바일 최적화

## 🔗 관련 링크

- **개발 블로그**: [Flow 개발 일지](https://velog.io/@lco2009d)
- **플로우 설명회 후기**: [협업툴에 대한 관심](https://velog.io/@lco2009d/%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%84%A4%EB%AA%85%ED%9A%8C-%EC%B0%B8%EC%84%9D-%ED%9B%84%EA%B8%B0%EA%BF%80)
- **화상회의 개발**: [WebRTC 구현 경험](https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B02.-%ED%99%94%EC%83%81%ED%9A%8C%EC%9D%98)
- **AI 회의요약**: [OpenAI API 활용](https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0-3.-%ED%9A%8C%EC%9D%98-ai%EC%9A%94%EC%95%BD-%EB%B0%8F-%EC%97%85%EB%AC%B4-%EB%B6%84%EB%8B%B4)

## 📊 API 문서

애플리케이션 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:
- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console

## 🧪 테스트

```bash
# 백엔드 테스트
cd backend
mvn test

# 프론트엔드 테스트
cd frontend
npm test
```

## 🚀 배포

### 백엔드 배포
```bash
cd backend
mvn clean package
java -jar target/flow-pms.jar --spring.profiles.active=prod
```

### 프론트엔드 배포
```bash
cd frontend
npm run build
# build 폴더를 웹 서버에 배포
```

## 🤝 기여하기

이 프로젝트는 포트폴리오 목적으로 제작되었지만, 개선 제안이나 피드백은 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

**LEES00** - 협업툴 전문 개발자를 꿈꾸는 개발자

- 이메일: lco2009d@naver.com
- 블로그: [https://velog.io/@lco2009d](https://velog.io/@lco2009d)
- GitHub: [https://github.com/gogoleelee88](https://github.com/gogoleelee88)

---

<div align="center">

**💡 "앞으로 개발자는 오히려 기획력과 배려지능이 필요할 것"**

*사용자 중심의 혁신적인 솔루션을 개발하여 사용자의 미래를 만들어가고 싶습니다.*

[![Stars](https://img.shields.io/github/stars/gogoleelee88/flow-pms?style=social)](https://github.com/gogoleelee88/flow-pms)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/gogoleelee88)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen.svg)](https://your-portfolio-url.com)

</div>