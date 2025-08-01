package com.flow.pms.service;

import com.flow.pms.dto.UserDto;
import com.flow.pms.entity.StatusMessage;
import com.flow.pms.entity.User;
import com.flow.pms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 사용자 비즈니스 로직 서비스
 * 사용자 관련 모든 비즈니스 로직을 처리
 */
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 모든 활성 사용자 조회
     */
    @Transactional(readOnly = true)
    public List<UserDto> getAllActiveUsers() {
        return userRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 사용자 ID로 조회
     */
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(UserDto::new);
    }

    /**
     * 사용자명으로 조회
     */
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(UserDto::new);
    }

    /**
     * 이메일로 조회
     */
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserDto::new);
    }

    /**
     * 새 사용자 생성
     */
    public UserDto createUser(UserDto userDto) {
        // 중복 체크
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("이미 존재하는 사용자명입니다: " + userDto.getUsername());
        }
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다: " + userDto.getEmail());
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setDisplayName(userDto.getDisplayName());
        user.setProfileIcon(userDto.getProfileIcon() != null ? userDto.getProfileIcon() : "😊");
        user.setStatusMessage(userDto.getStatusMessage());
        user.setRole(userDto.getRole() != null ? userDto.getRole() : "USER");
        user.setIsActive(true);

        User savedUser = userRepository.save(user);
        return new UserDto(savedUser);
    }

    /**
     * 사용자 정보 업데이트
     */
    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + userId));

        // 중복 체크 (자신 제외)
        if (userDto.getUsername() != null && 
            userRepository.existsByUsernameAndIdNot(userDto.getUsername(), userId)) {
            throw new RuntimeException("이미 존재하는 사용자명입니다: " + userDto.getUsername());
        }
        if (userDto.getEmail() != null && 
            userRepository.existsByEmailAndIdNot(userDto.getEmail(), userId)) {
            throw new RuntimeException("이미 존재하는 이메일입니다: " + userDto.getEmail());
        }

        // 업데이트할 필드들
        if (userDto.getUsername() != null) {
            user.setUsername(userDto.getUsername());
        }
        if (userDto.getEmail() != null) {
            user.setEmail(userDto.getEmail());
        }
        if (userDto.getDisplayName() != null) {
            user.setDisplayName(userDto.getDisplayName());
        }
        if (userDto.getProfileIcon() != null) {
            user.setProfileIcon(userDto.getProfileIcon());
        }
        if (userDto.getStatusMessage() != null) {
            user.setStatusMessage(userDto.getStatusMessage());
        }
        if (userDto.getRole() != null) {
            user.setRole(userDto.getRole());
        }
        if (userDto.getIsActive() != null) {
            user.setIsActive(userDto.getIsActive());
        }

        User updatedUser = userRepository.save(user);
        return new UserDto(updatedUser);
    }

    /**
     * 사용자 상태 메시지 업데이트
     */
    public UserDto updateUserStatus(Long userId, String profileIcon, String statusMessage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + userId));

        if (profileIcon != null) {
            user.setProfileIcon(profileIcon);
        }
        if (statusMessage != null) {
            user.setStatusMessage(statusMessage);
        }

        User updatedUser = userRepository.save(user);
        return new UserDto(updatedUser);
    }

    /**
     * 사용자 비활성화 (소프트 삭제)
     */
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + userId));

        user.setIsActive(false);
        userRepository.save(user);
    }

    /**
     * 사용자 활성화
     */
    public UserDto activateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + userId));

        user.setIsActive(true);
        User updatedUser = userRepository.save(user);
        return new UserDto(updatedUser);
    }

    /**
     * 사용자 검색 (표시명 기준)
     */
    @Transactional(readOnly = true)
    public List<UserDto> searchUsersByDisplayName(String displayName) {
        return userRepository.findByDisplayNameContainingIgnoreCase(displayName)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 사용자 통합 검색 (사용자명, 표시명, 이메일)
     */
    @Transactional(readOnly = true)
    public List<UserDto> searchUsers(String keyword) {
        return userRepository.searchUsers(keyword)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 역할별 사용자 조회
     */
    @Transactional(readOnly = true)
    public List<UserDto> getUsersByRole(String role) {
        return userRepository.findByRoleAndIsActiveTrueOrderByCreatedAtDesc(role)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 상태 메시지가 있는 사용자 조회
     */
    @Transactional(readOnly = true)
    public List<UserDto> getUsersWithStatusMessage() {
        return userRepository.findUsersWithStatusMessage()
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 특정 상태 메시지를 가진 사용자 검색
     */
    @Transactional(readOnly = true)
    public List<UserDto> searchUsersByStatusMessage(String message) {
        return userRepository.findByStatusMessageContainingIgnoreCase(message)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 최근 활동한 사용자 조회
     */
    @Transactional(readOnly = true)
    public List<UserDto> getRecentlyActiveUsers(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        return userRepository.findRecentlyActive(since)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 프로젝트를 가진 사용자 조회
     */
    @Transactional(readOnly = true)
    public List<UserDto> getUsersWithProjects() {
        return userRepository.findUsersWithProjects()
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 사용자명 또는 이메일로 로그인 처리
     */
    @Transactional(readOnly = true)
    public Optional<UserDto> authenticateUser(String identifier) {
        return userRepository.findByUsernameOrEmail(identifier)
                .filter(User::getIsActive)
                .map(UserDto::new);
    }

    /**
     * 활성 사용자 수
     */
    @Transactional(readOnly = true)
    public long getActiveUserCount() {
        return userRepository.countByIsActiveTrue();
    }

    /**
     * 역할별 사용자 수
     */
    @Transactional(readOnly = true)
    public long getUserCountByRole(String role) {
        return userRepository.countByRoleAndIsActiveTrue(role);
    }

    /**
     * 최근 가입한 사용자 조회
     */
    @Transactional(readOnly = true)
    public List<UserDto> getRecentlyRegisteredUsers(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        return userRepository.findUsersRegisteredSince(since)
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 사용자 존재 여부 확인
     */
    @Transactional(readOnly = true)
    public boolean userExists(String username, String email) {
        return userRepository.existsByUsername(username) || userRepository.existsByEmail(email);
    }

    /**
     * 기본 사용자 데이터 초기화 (개발용)
     */
    public UserDto createDefaultUser() {
        if (!userRepository.existsByUsername("LEES00")) {
            UserDto defaultUser = new UserDto("LEES00", "lees00@example.com", "LEES00");
            defaultUser.setProfileIcon("😊");
            defaultUser.setStatusMessage("협업툴 개발자를 꿈꿉니다");
            defaultUser.setRole("ADMIN");
            return createUser(defaultUser);
        }
        return getUserByUsername("LEES00").orElse(null);
    }
}