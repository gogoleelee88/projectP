package com.flow.pms.dto;

import com.flow.pms.entity.Project;
import java.time.LocalDateTime;

/**
 * 프로젝트 데이터 전송 객체 (DTO)
 * API 요청/응답에서 사용되는 프로젝트 데이터 구조
 */
public class ProjectDto {

    private Long id;
    private String title;
    private String category;
    private Boolean isPublic;
    private Boolean hasAdminAccess;
    private String status;
    private String description;
    private Long ownerId;
    private String ownerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 기본 생성자
    public ProjectDto() {}

    // Entity로부터 DTO 생성하는 생성자
    public ProjectDto(Project project) {
        this.id = project.getId();
        this.title = project.getTitle();
        this.category = project.getCategory();
        this.isPublic = project.getIsPublic();
        this.hasAdminAccess = project.getHasAdminAccess();
        this.status = project.getStatus();
        this.description = project.getDescription();
        this.createdAt = project.getCreatedAt();
        this.updatedAt = project.getUpdatedAt();
        
        if (project.getOwner() != null) {
            this.ownerId = project.getOwner().getId();
            this.ownerName = project.getOwner().getDisplayName();
        }
    }

    // 전체 필드 생성자
    public ProjectDto(Long id, String title, String category, Boolean isPublic, 
                     Boolean hasAdminAccess, String status, String description) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.isPublic = isPublic;
        this.hasAdminAccess = hasAdminAccess;
        this.status = status;
        this.description = description;
    }

    // 프로젝트 생성용 생성자
    public ProjectDto(String title, String category, Boolean isPublic, Boolean hasAdminAccess) {
        this.title = title;
        this.category = category;
        this.isPublic = isPublic;
        this.hasAdminAccess = hasAdminAccess;
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public Boolean getHasAdminAccess() {
        return hasAdminAccess;
    }

    public void setHasAdminAccess(Boolean hasAdminAccess) {
        this.hasAdminAccess = hasAdminAccess;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
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

    @Override
    public String toString() {
        return "ProjectDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", status='" + status + '\'' +
                ", ownerName='" + ownerName + '\'' +
                '}';
    }
}