package com.flow.pms.repository;

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
 * 사용자 데이터 액세스 레이어
 * JPA Repository를 통한 사용자 관련 데이터베이스 작업
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 사용자명으로 사용자 찾기
    Optional<User> findByUsername(String username);

    // 이메일로 사용자 찾기
    Optional<User> findByEmail(String email);

    // 사용자명 또는 이메일로 사용자 찾기
    @Query("SELECT u FROM User u WHERE u.username = :identifier OR u.email = :identifier")
    Optional<User> findByUsernameOrEmail(@Param("identifier") String identifier);

    // 활성 사용자만 조회
    List<User> findByIsActiveTrueOrderByCreatedAtDesc();

    // 활성 사용자 페이징 조회
    Page<User> findByIsActiveTrueOrderByCreatedAtDesc(Pageable pageable);

    // 표시명으로 사용자 검색 (대소문자 구분 없음)
    @Query("SELECT u FROM User u WHERE LOWER(u.displayName) LIKE LOWER(CONCAT('%', :displayName, '%')) " +
           "AND u.isActive = true ORDER BY u.displayName")
    List<User> findByDisplayNameContainingIgnoreCase(@Param("displayName") String displayName);

    // 사용자명, 표시명, 이메일로 통합 검색
    @Query("SELECT u FROM User u WHERE " +
           "(LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.displayName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND u.isActive = true ORDER BY u.displayName")
    List<User> searchUsers(@Param("keyword") String keyword);

    // 역할별 사용자 조회
    List<User> findByRoleAndIsActiveTrueOrderByCreatedAtDesc(String role);

    // 상태 메시지가 있는 사용자 조회
    @Query("SELECT u FROM User u WHERE u.statusMessage IS NOT NULL AND u.statusMessage != '' " +
           "AND u.isActive = true ORDER BY u.updatedAt DESC")
    List<User> findUsersWithStatusMessage();

    // 특정 상태 메시지를 가진 사용자 검색
    @Query("SELECT u FROM User u WHERE LOWER(u.statusMessage) LIKE LOWER(CONCAT('%', :message, '%')) " +
           "AND u.isActive = true ORDER BY u.updatedAt DESC")
    List<User> findByStatusMessageContainingIgnoreCase(@Param("message") String message);

    // 최근 활동한 사용자 (최근 업데이트 기준)
    @Query("SELECT u FROM User u WHERE u.updatedAt >= :since AND u.isActive = true ORDER BY u.updatedAt DESC")
    List<User> findRecentlyActive(@Param("since") LocalDateTime since);

    // 프로젝트를 가진 사용자 조회
    @Query("SELECT DISTINCT u FROM User u JOIN u.projects p WHERE u.isActive = true ORDER BY u.displayName")
    List<User> findUsersWithProjects();

    // 특정 개수 이상의 프로젝트를 가진 사용자
    @Query("SELECT u FROM User u WHERE u.isActive = true AND SIZE(u.projects) >= :minProjectCount ORDER BY SIZE(u.projects) DESC")
    List<User> findUsersWithMinimumProjects(@Param("minProjectCount") int minProjectCount);

    // 사용자명 존재 여부 확인
    boolean existsByUsername(String username);

    // 이메일 존재 여부 확인
    boolean existsByEmail(String email);

    // 사용자명 존재 여부 확인 (특정 ID 제외)
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.username = :username AND u.id != :excludeId")
    boolean existsByUsernameAndIdNot(@Param("username") String username, @Param("excludeId") Long excludeId);

    // 이메일 존재 여부 확인 (특정 ID 제외)
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = :email AND u.id != :excludeId")
    boolean existsByEmailAndIdNot(@Param("email") String email, @Param("excludeId") Long excludeId);

    // 활성 사용자 수
    long countByIsActiveTrue();

    // 역할별 사용자 수
    long countByRoleAndIsActiveTrue(String role);

    // 최근 N일 동안 가입한 사용자
    @Query("SELECT u FROM User u WHERE u.createdAt >= :startDate AND u.isActive = true ORDER BY u.createdAt DESC")
    List<User> findUsersRegisteredSince(@Param("startDate") LocalDateTime startDate);

    // 프로필 아이콘별 사용자 조회 (통계용)
    @Query("SELECT u.profileIcon, COUNT(u) FROM User u WHERE u.isActive = true GROUP BY u.profileIcon")
    List<Object[]> countUsersByProfileIcon();
}