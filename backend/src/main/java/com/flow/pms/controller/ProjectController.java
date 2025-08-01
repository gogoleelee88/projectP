package com.flow.pms.controller;

import com.flow.pms.dto.ProjectDto;
import com.flow.pms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * 프로젝트 관련 REST API 컨트롤러
 * 프로젝트 CRUD 및 검색 기능 제공
 */
@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * 모든 프로젝트 조회
     * GET /api/projects
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProjects() {
        try {
            List<ProjectDto> projects = projectService.getAllProjects();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", stats);
            response.put("message", "프로젝트 통계를 조회했습니다.");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 통계 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}", projects);
            response.put("message", "프로젝트 목록을 성공적으로 조회했습니다.");
            response.put("count", projects.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 목록 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 공개 프로젝트만 조회
     * GET /api/projects/public
     */
    @GetMapping("/public")
    public ResponseEntity<Map<String, Object>> getPublicProjects() {
        try {
            List<ProjectDto> projects = projectService.getPublicProjects();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", projects);
            response.put("message", "공개 프로젝트 목록을 성공적으로 조회했습니다.");
            response.put("count", projects.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "공개 프로젝트 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 특정 프로젝트 조회
     * GET /api/projects/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProjectById(@PathVariable Long id) {
        try {
            Optional<ProjectDto> project = projectService.getProjectById(id);
            Map<String, Object> response = new HashMap<>();
            
            if (project.isPresent()) {
                response.put("success", true);
                response.put("data", project.get());
                response.put("message", "프로젝트를 성공적으로 조회했습니다.");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "프로젝트를 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 사용자의 프로젝트 조회
     * GET /api/projects/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserProjects(@PathVariable Long userId) {
        try {
            List<ProjectDto> projects = projectService.getUserProjects(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", projects);
            response.put("message", "사용자 프로젝트를 성공적으로 조회했습니다.");
            response.put("count", projects.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "사용자 프로젝트 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 새 프로젝트 생성
     * POST /api/projects
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createProject(
            @RequestBody ProjectDto projectDto,
            @RequestParam Long ownerId) {
        try {
            ProjectDto createdProject = projectService.createProject(projectDto, ownerId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", createdProject);
            response.put("message", "프로젝트가 성공적으로 생성되었습니다.");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 생성 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    /**
     * 프로젝트 업데이트
     * PUT /api/projects/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectDto projectDto,
            @RequestParam Long userId) {
        try {
            ProjectDto updatedProject = projectService.updateProject(id, projectDto, userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", updatedProject);
            response.put("message", "프로젝트가 성공적으로 업데이트되었습니다.");
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 업데이트 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 프로젝트 삭제
     * DELETE /api/projects/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProject(
            @PathVariable Long id,
            @RequestParam Long userId) {
        try {
            projectService.deleteProject(id, userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "프로젝트가 성공적으로 삭제되었습니다.");
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 삭제 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 프로젝트 검색
     * GET /api/projects/search?keyword={keyword}
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProjects(@RequestParam String keyword) {
        try {
            List<ProjectDto> projects = projectService.searchProjects(keyword);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", projects);
            response.put("message", "프로젝트 검색을 완료했습니다.");
            response.put("count", projects.size());
            response.put("keyword", keyword);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 검색 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 카테고리별 프로젝트 조회
     * GET /api/projects/category/{category}
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<Map<String, Object>> getProjectsByCategory(@PathVariable String category) {
        try {
            List<ProjectDto> projects = projectService.getProjectsByCategory(category);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", projects);
            response.put("message", category + " 카테고리 프로젝트를 조회했습니다.");
            response.put("count", projects.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "카테고리별 프로젝트 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 상태별 프로젝트 조회
     * GET /api/projects/status/{status}
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<Map<String, Object>> getProjectsByStatus(@PathVariable String status) {
        try {
            List<ProjectDto> projects = projectService.getProjectsByStatus(status);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", projects);
            response.put("message", status + " 상태 프로젝트를 조회했습니다.");
            response.put("count", projects.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "상태별 프로젝트 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 최근 업데이트된 프로젝트 조회
     * GET /api/projects/recent?days={days}
     */
    @GetMapping("/recent")
    public ResponseEntity<Map<String, Object>> getRecentlyUpdatedProjects(
            @RequestParam(defaultValue = "7") int days) {
        try {
            List<ProjectDto> projects = projectService.getRecentlyUpdatedProjects(days);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", projects);
            response.put("message", "최근 " + days + "일간 업데이트된 프로젝트를 조회했습니다.");
            response.put("count", projects.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "최근 프로젝트 조회 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 프로젝트 상태 변경
     * PATCH /api/projects/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> changeProjectStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam Long userId) {
        try {
            ProjectDto updatedProject = projectService.changeProjectStatus(id, status, userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", updatedProject);
            response.put("message", "프로젝트 상태가 " + status + "로 변경되었습니다.");
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "프로젝트 상태 변경 중 오류가 발생했습니다: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 프로젝트 통계 정보
     * GET /api/projects/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getProjectStats() {
        try {
            long totalProjects = projectService.getAllProjects().size();
            long publicProjects = projectService.getPublicProjectCount();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalProjects", totalProjects);
            stats.put("publicProjects", publicProjects);
            stats.put("privateProjects", totalProjects - publicProjects);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data