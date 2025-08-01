package com.flow.pms.controller;

import com.flow.pms.dto.SearchResultDto;
import com.flow.pms.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 통합 검색 관련 REST API 컨트롤러
 * 프로젝트, 사용자, 메뉴 등의 통합 검색 기능 제공
 */
@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    /**
     * 통합 검색 - 모든 항목 검색
     * GET /api/search?q={query}
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> searchAll(@RequestParam("q") String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "검색어를 입력해주세요.");
                return ResponseEntity.badRequest().body(response);
            }

            List<SearchResultDto> results = searchService.searchAll(query);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("message", "검색을 완료했습니다.");
            response.put("query", query);
            response.put("count", results.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 프로젝트 전용 검색
     * GET /api/search/projects?q={query}
     */
    @GetMapping("/projects")
    public ResponseEntity<Map<String, Object>> searchProjects(@RequestParam("q") String query) {
        try {
            List<SearchResultDto> results = searchService.searchProjects(query);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("message", "프로젝트 검색을 완료했습니다.");
            response.put("query", query);
            response.put("count", results.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 사용자 전용 검색
     * GET /api/search/users?q={query}
     */
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> searchUsers(@RequestParam("q") String query) {
        try {
            List<SearchResultDto> results = searchService.searchUsers(query);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("message", "사용자 검색을 완료했습니다.");
            response.put("query", query);
            response.put("count", results.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "사용자 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 카테고리별 검색
     * GET /api/search/category/{category}?q={query}
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<Map<String, Object>> searchByCategory(
            @PathVariable String category,
            @RequestParam("q") String query) {
        try {
            List<SearchResultDto> results = searchService.searchByCategory(category, query);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("message", category + " 카테고리에서 검색을 완료했습니다.");
            response.put("category", category);
            response.put("query", query);
            response.put("count", results.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "카테고리별 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 사용자별 개인화된 검색
     * GET /api/search/user/{userId}?q={query}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> searchForUser(
            @PathVariable Long userId,
            @RequestParam("q") String query) {
        try {
            List<SearchResultDto> results = searchService.searchForUser(query, userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("message", "개인화된 검색을 완료했습니다.");
            response.put("userId", userId);
            response.put("query", query);
            response.put("count", results.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "개인화된 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 상태 메시지 검색
     * GET /api/search/status?q={query}
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> searchStatusMessages(@RequestParam("q") String query) {
        try {
            List<SearchResultDto> results = searchService.searchStatusMessages(query);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("message", "상태 메시지 검색을 완료했습니다.");
            response.put("query", query);
            response.put("count", results.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "상태 메시지 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 인기 검색어 조회
     * GET /api/search/popular
     */
    @GetMapping("/popular")
    public ResponseEntity<Map<String, Object>> getPopularSearchTerms() {
        try {
            List<String> popularTerms = searchService.getPopularSearchTerms();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", popularTerms);
            response.put("message", "인기 검색어를 조회했습니다.");
            response.put("count", popularTerms.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "인기 검색어 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 검색 통계 조회
     * GET /api/search/stats?q={query}
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSearchStatistics(@RequestParam("q") String query) {
        try {
            SearchService.SearchStatistics stats = searchService.getSearchStatistics(query);
            
            Map<String, Object> statisticsData = new HashMap<>();
            statisticsData.put("projectCount", stats.getProjectCount());
            statisticsData.put("userCount", stats.getUserCount());
            statisticsData.put("menuCount", stats.getMenuCount());
            statisticsData.put("blogCount", stats.getBlogCount());
            statisticsData.put("totalCount", stats.getTotalCount());
            statisticsData.put("query", query);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", statisticsData);
            response.put("message", "검색 통계를 조회했습니다.");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "검색 통계 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 검색 제안 (자동완성)
     * GET /api/search/suggest?q={query}
     */
    @GetMapping("/suggest")
    public ResponseEntity<Map<String, Object>> getSuggestions(@RequestParam("q") String query) {
        try {
            // 간단한 제안 로직 (실제로는 더 복잡한 알고리즘 사용)
            List<String> suggestions = searchService.getPopularSearchTerms()
                    .stream()
                    .filter(term -> term.toLowerCase().contains(query.toLowerCase()))
                    .limit(5)
                    .toList();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", suggestions);
            response.put("message", "검색 제안을 조회했습니다.");
            response.put("query", query);
            response.put("count", suggestions.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "검색 제안 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 빠른 검색 (검색 결과 미리보기)
     * GET /api/search/quick?q={query}
     */
    @GetMapping("/quick")
    public ResponseEntity<Map<String, Object>> quickSearch(@RequestParam("q") String query) {
        try {
            List<SearchResultDto> allResults = searchService.searchAll(query);
            
            // 각 카테고리별로 상위 3개씩만 반환
            Map<String, List<SearchResultDto>> quickResults = new HashMap<>();
            
            quickResults.put("프로젝트", allResults.stream()
                    .filter(r -> "프로젝트".equals(r.getType()) || "내 프로젝트".equals(r.getType()))
                    .limit(3)
                    .toList());
            
            quickResults.put("메뉴", allResults.stream()
                    .filter(r -> "메뉴".equals(r.getType()))
                    .limit(3)
                    .toList());
            
            quickResults.put("사용자", allResults.stream()
                    .filter(r -> "사용자".equals(r.getType()))
                    .limit(3)
                    .toList());
            
            quickResults.put("블로그", allResults.stream()
                    .filter(r -> "블로그".equals(r.getType()))
                    .limit(3)
                    .toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", quickResults);
            response.put("message", "빠른 검색을 완료했습니다.");
            response.put("query", query);
            response.put("totalCount", allResults.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "빠른 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}