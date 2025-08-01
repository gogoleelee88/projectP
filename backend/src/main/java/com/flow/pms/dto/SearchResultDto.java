package com.flow.pms.dto;

/**
 * 검색 결과 데이터 전송 객체 (DTO)
 * 통합 검색 결과를 위한 공통 데이터 구조
 */
public class SearchResultDto {

    private String type;        // 검색 결과 유형 (프로젝트, 메뉴, 상태, 사용자)
    private String title;       // 검색 결과 제목
    private String category;    // 카테고리 또는 부가 정보
    private String description; // 설명
    private Long id;           // 관련 엔티티 ID
    private String url;        // 연결할 URL (선택사항)
    private String icon;       // 표시할 아이콘

    // 기본 생성자
    public SearchResultDto() {}

    // 프로젝트 검색 결과용 생성자
    public SearchResultDto(String type, String title, String category, Long id) {
        this.type = type;
        this.title = title;
        this.category = category;
        this.id = id;
        this.icon = getDefaultIcon(type);
    }

    // 메뉴 검색 결과용 생성자
    public SearchResultDto(String type, String title, String url) {
        this.type = type;
        this.title = title;
        this.url = url;
        this.icon = getDefaultIcon(type);
    }

    // 전체 필드 생성자
    public SearchResultDto(String type, String title, String category, String description, 
                          Long id, String url, String icon) {
        this.type = type;
        this.title = title;
        this.category = category;
        this.description = description;
        this.id = id;
        this.url = url;
        this.icon = icon != null ? icon : getDefaultIcon(type);
    }

    // 타입별 기본 아이콘 반환
    private String getDefaultIcon(String type) {
        switch (type) {
            case "프로젝트":
                return "📋";
            case "메뉴":
                return "📱";
            case "상태":
                return "💬";
            case "사용자":
                return "👤";
            case "블로그":
                return "📝";
            default:
                return "🔗";
        }
    }

    // Getter & Setter
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
        if (this.icon == null) {
            this.icon = getDefaultIcon(type);
        }
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    @Override
    public String toString() {
        return "SearchResultDto{" +
                "type='" + type + '\'' +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", id=" + id +
                '}';
    }
}