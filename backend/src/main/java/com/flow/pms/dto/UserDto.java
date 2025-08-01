package com.flow.pms.dto;

import com.flow.pms.entity.User;
import java.time.LocalDateTime;

/**
 * 사용자 데이터 전송 객체 (DTO)
 * API 요청/응답에서 사용되는 사용자 데이터 구조
 */
public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String displayName;
    private String profileIcon;
    private String statusMessage;
    private String role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer projectCount; // 사용자가 소유한 프로젝트 수

    // 기본 생성자
    public UserDto() {}

    // Entity로부터 DTO 생성하는 생성자
    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.displayName = user.getDisplayName();
        this.profileIcon = user.getProfileIcon();
        this.statusMessage = user.getStatusMessage();
        this.role = user.getRole();
        this.isActive = user.getIsActive();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
        this.projectCount = user.getProjects().size();
    }

    // 사용자 등록용 생성자
    public UserDto(String username, String email, String displayName) {
        this.username = username;
        this.email = email;
        this.displayName = displayName;
    }

    // 상태 업데이트용 생성자
    public UserDto(String profileIcon, String statusMessage) {
        this.profileIcon = profileIcon;
        this.statusMessage = statusMessage;
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getProfileIcon() {
        return profileIcon;
    }

    public void setProfileIcon(String profileIcon) {
        this.profileIcon = profileIcon;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getProjectCount() {
        return projectCount;
    }

    public void setProjectCount(Integer projectCount) {
        this.projectCount = projectCount;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", displayName='" + displayName + '\'' +
                ", statusMessage='" + statusMessage + '\'' +
                ", projectCount=" + projectCount +
                '}';
    }
}