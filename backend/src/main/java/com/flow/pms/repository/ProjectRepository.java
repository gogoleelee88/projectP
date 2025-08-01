package com.flow.pms.repository;

import com.flow.pms.entity.Project;
import com.flow.pms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 프로젝트 데이터 액세스 레이어
 * JPA Repository를 통한 데이터베이스 작업
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 사용자별 프로젝트 조회
    List<Project> findByOwnerOrderByCreatedAtDesc(User owner);

    // 사용자별 프로젝트 페이징 조회
    Page<Project> findByOwnerOrderByCreatedAtDesc(User owner, Pageable pageable);

    // 공개 프로젝트 조회
    List<Project> findByIsPublicTrueOrderByCreatedAtDesc();

    // 공개 프로젝트 페이징 조회
    Page<Project> findByIsPublicTrueOrderByCreatedAtDesc(Pageable pageable);

    // 카테고리별 프로젝트 조회
    List<Project> findByCategoryOrderByCreatedAtDesc(String category);

    // 상태별 프로젝트 조회
    List<Project> findByStatusOrderByCreatedAtDesc(String status);

    // 제목으로 프로젝트 검색 (대소문자 구분 없음)
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :title, '%')) ORDER BY p.createdAt DESC")
    List<Project> findByTitleContainingIgnoreCase(@Param("title") String title);

    // 제목 또는 설명으로 프로젝트 검색
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY p.createdAt DESC")
    List<Project> searchByTitleOrDescription(@Param("keyword") String keyword);

    // 사용자의 특정 카테고리 프로젝트 조회
    List<Project> findByOwnerAndCategoryOrderByCreatedAtDesc(User owner, String category);

    // 최근 업데이트된 프로젝트 조회
    @Query("SELECT p FROM Project p WHERE p.updatedAt >= :since ORDER BY p.updatedAt DESC")
    List<Project> findRecentlyUpdated(@Param("since") LocalDateTime since);

    // 프로젝트 개수 카운팅
    long countByOwner(User owner);

    // 공개 프로젝트 개수 카운팅
    long countByIsPublicTrue();

    // 카테고리별 프로젝트 개수 카운팅
    long countByCategory(String category);

    // 사용자의 특정 상태 프로젝트 조회
    List<Project> findByOwnerAndStatusOrderByCreatedAtDesc(User owner, String status);

    // ID와 소유자로 프로젝트 조회 (권한 체크용)
    Optional<Project> findByIdAndOwner(Long id, User owner);

    // 최근 N일 동안 생성된 프로젝트
    @Query("SELECT p FROM Project p WHERE p.createdAt >= :startDate ORDER BY p.createdAt DESC")
    List<Project> findProjectsCreatedSince(@Param("startDate") LocalDateTime startDate);

    // 사용자의 프로젝트 중 가장 최근 업데이트
    @Query("SELECT p FROM Project p WHERE p.owner = :owner ORDER BY p.updatedAt DESC")
    List<Project> findTopByOwnerOrderByUpdatedAtDesc(@Param("owner") User owner, Pageable pageable);
}