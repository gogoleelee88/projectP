import { apiHelper, endpoints, handleApiError, showSuccessMessage } from './api';

/**
 * 프로젝트 관련 API 서비스
 * 프로젝트 CRUD 및 관련 기능들을 처리
 */
export const projectService = {
  /**
   * 모든 프로젝트 조회
   */
  getAllProjects: async () => {
    try {
      const response = await apiHelper.get(endpoints.projects.list);
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 목록을 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 공개 프로젝트만 조회
   */
  getPublicProjects: async () => {
    try {
      const response = await apiHelper.get(endpoints.projects.public);
      return response;
    } catch (error) {
      handleApiError(error, '공개 프로젝트 목록을 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 특정 프로젝트 조회
   */
  getProjectById: async (projectId) => {
    try {
      const response = await apiHelper.get(endpoints.projects.get(projectId));
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 정보를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자의 프로젝트 조회
   */
  getUserProjects: async (userId) => {
    try {
      const response = await apiHelper.get(endpoints.projects.userProjects(userId));
      return response;
    } catch (error) {
      handleApiError(error, '사용자 프로젝트를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 새 프로젝트 생성
   */
  createProject: async (projectData, ownerId) => {
    try {
      const response = await apiHelper.post(
        endpoints.projects.create, 
        projectData,
        { params: { ownerId } }
      );
      
      if (response.success) {
        showSuccessMessage('프로젝트가 성공적으로 생성되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 생성에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 업데이트
   */
  updateProject: async (projectId, projectData, userId) => {
    try {
      const response = await apiHelper.put(
        endpoints.projects.update(projectId),
        projectData,
        { params: { userId } }
      );
      
      if (response.success) {
        showSuccessMessage('프로젝트가 성공적으로 업데이트되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 업데이트에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 삭제
   */
  deleteProject: async (projectId, userId) => {
    try {
      const response = await apiHelper.delete(
        endpoints.projects.delete(projectId),
        { params: { userId } }
      );
      
      if (response.success) {
        showSuccessMessage('프로젝트가 성공적으로 삭제되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 삭제에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 검색
   */
  searchProjects: async (keyword) => {
    try {
      const response = await apiHelper.get(endpoints.projects.search, { keyword });
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 카테고리별 프로젝트 조회
   */
  getProjectsByCategory: async (category) => {
    try {
      const response = await apiHelper.get(endpoints.projects.byCategory(category));
      return response;
    } catch (error) {
      handleApiError(error, `${category} 카테고리 프로젝트를 불러오는데 실패했습니다.`);
      throw error;
    }
  },

  /**
   * 상태별 프로젝트 조회
   */
  getProjectsByStatus: async (status) => {
    try {
      const response = await apiHelper.get(endpoints.projects.byStatus(status));
      return response;
    } catch (error) {
      handleApiError(error, `${status} 상태 프로젝트를 불러오는데 실패했습니다.`);
      throw error;
    }
  },

  /**
   * 최근 업데이트된 프로젝트 조회
   */
  getRecentlyUpdatedProjects: async (days = 7) => {
    try {
      const response = await apiHelper.get(endpoints.projects.recent, { days });
      return response;
    } catch (error) {
      handleApiError(error, '최근 프로젝트를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 상태 변경
   */
  changeProjectStatus: async (projectId, status, userId) => {
    try {
      const response = await apiHelper.patch(
        endpoints.projects.changeStatus(projectId),
        {},
        { params: { status, userId } }
      );
      
      if (response.success) {
        showSuccessMessage(`프로젝트 상태가 ${status}로 변경되었습니다.`);
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 상태 변경에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 통계 조회
   */
  getProjectStats: async () => {
    try {
      const response = await apiHelper.get(endpoints.projects.stats);
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 통계를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 카테고리 목록
   */
  getCategories: () => {
    return ['피드', '업무', '간트차트', '캘린더', '파일'];
  },

  /**
   * 프로젝트 상태 목록
   */
  getStatuses: () => {
    return ['예정', '진행중', '완료', '보류', '취소'];
  },

  /**
   * 프로젝트 데이터 검증
   */
  validateProjectData: (projectData) => {
    const errors = [];

    if (!projectData.title || projectData.title.trim().length === 0) {
      errors.push('프로젝트 제목은 필수입니다.');
    }

    if (projectData.title && projectData.title.length > 255) {
      errors.push('프로젝트 제목은 255자를 초과할 수 없습니다.');
    }

    if (!projectData.category) {
      errors.push('카테고리를 선택해주세요.');
    }

    if (projectData.category && !projectService.getCategories().includes(projectData.category)) {
      errors.push('유효하지 않은 카테고리입니다.');
    }

    if (projectData.description && projectData.description.length > 1000) {
      errors.push('프로젝트 설명은 1000자를 초과할 수 없습니다.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * 프로젝트 기본 데이터 생성
   */
  createDefaultProjectData: () => {
    return {
      title: '',
      category: '피드',
      isPublic: true,
      hasAdminAccess: true,
      description: '',
      status: '진행중'
    };
  },

  /**
   * 프로젝트 필터링
   */
  filterProjects: (projects, filters) => {
    return projects.filter(project => {
      // 카테고리 필터
      if (filters.category && project.category !== filters.category) {
        return false;
      }

      // 상태 필터
      if (filters.status && project.status !== filters.status) {
        return false;
      }

      // 공개/비공개 필터
      if (filters.isPublic !== undefined && project.isPublic !== filters.isPublic) {
        return false;
      }

      // 검색어 필터
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const titleMatch = project.title.toLowerCase().includes(searchLower);
        const descriptionMatch = project.description?.toLowerCase().includes(searchLower);
        
        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      // 날짜 범위 필터
      if (filters.dateFrom) {
        const projectDate = new Date(project.createdAt);
        const fromDate = new Date(filters.dateFrom);
        if (projectDate < fromDate) {
          return false;
        }
      }

      if (filters.dateTo) {
        const projectDate = new Date(project.createdAt);
        const toDate = new Date(filters.dateTo);
        if (projectDate > toDate) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * 프로젝트 정렬
   */
  sortProjects: (projects, sortBy = 'createdAt', sortOrder = 'desc') => {
    return [...projects].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // 날짜 필드 처리
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // 문자열 필드 처리
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
};