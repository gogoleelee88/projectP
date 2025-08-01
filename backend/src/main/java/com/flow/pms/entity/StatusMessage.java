package com.flow.pms.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 상태 메시지 엔티티
 * 사용자의 상태 메시지 히스토리를 저장하는 테이블
 */
@Entity
@Table(name = "status_messages")
@EntityListeners(AuditingEntityListener.class)
public class StatusMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = 10, nullable = false)
    private String icon;

    @Column(length = 255, nullable = false)
    private String message;

    @Column(length = 50)
    private String label;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // 기본 생성자
    public StatusMessage() {}

    // 생성자
    public StatusMessage(User user, String icon, String message, String label) {
        this.user = user;
        this.icon = icon;
        this.message = message;
        this.label = label;
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
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

    @Override
    public String toString() {
        return "StatusMessage{" +
                "id=" + id +
                ", icon='" + icon + '\'' +
                ", message='" + message + '\'' +
                ", label='" + label + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}