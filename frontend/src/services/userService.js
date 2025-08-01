import { apiHelper, endpoints, handleApiError, showSuccessMessage } from './api';

/**
 * 사용자 관련 API 서비스
 * 사용자 CRUD, 인증, 상태 관리 기능들을 처리
 */
export const userService = {
  /**
   * 모든 활성 사용자 조회
   */
  getAllUsers: async () => {
    try {
      const response = await apiHelper.get(endpoints.users.list);
      return response;
    } catch (error) {
      handleApiError(error, '사용자 목록을 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 특정 사용자 조회 (ID)
   */
  getUserById: async (userId) => {
    try {
      const response = await apiHelper.get(endpoints.users.get(userId));
      return response;
    } catch (error) {
      handleApiError(error, '사용자 정보를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자명으로 사용자 조회
   */
  getUserByUsername: async (username) => {
    try {
      const response = await apiHelper.get(`${endpoints.users.list}/username/${username}`);
      return response;
    } catch (error) {
      handleApiError(error, '사용자를 찾을 수 없습니다.');
      throw error;
    }
  },

  /**
   * 새 사용자 생성 (회원가입)
   */
  createUser: async (userData) => {
    try {
      const response = await apiHelper.post(endpoints.users.create, userData);
      
      if (response.success) {
        showSuccessMessage('사용자가 성공적으로 생성되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '사용자 생성에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 정보 업데이트
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await apiHelper.put(endpoints.users.update(userId), userData);
      
      if (response.success) {
        showSuccessMessage('사용자 정보가 성공적으로 업데이트되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '사용자 정보 업데이트에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 상태 메시지 업데이트
   */
  updateUserStatus: async (userId, profileIcon, statusMessage) => {
    try {
      const statusData = {};
      if (profileIcon !== undefined) statusData.profileIcon = profileIcon;
      if (statusMessage !== undefined) statusData.statusMessage = statusMessage;

      const response = await apiHelper.patch(endpoints.users.updateStatus(userId), statusData);
      
      if (response.success) {
        showSuccessMessage('상태가 성공적으로 업데이트되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '상태 업데이트에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 비활성화
   */
  deactivateUser: async (userId) => {
    try {
      const response = await apiHelper.delete(endpoints.users.delete(userId));
      
      if (response.success) {
        showSuccessMessage('사용자가 성공적으로 비활성화되었습니다.');
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '사용자 비활성화에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 검색
   */
  searchUsers: async (keyword) => {
    try {
      const response = await apiHelper.get(endpoints.users.search, { keyword });
      return response;
    } catch (error) {
      handleApiError(error, '사용자 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 역할별 사용자 조회
   */
  getUsersByRole: async (role) => {
    try {
      const response = await apiHelper.get(`${endpoints.users.list}/role/${role}`);
      return response;
    } catch (error) {
      handleApiError(error, `${role} 역할 사용자를 불러오는데 실패했습니다.`);
      throw error;
    }
  },

  /**
   * 상태 메시지가 있는 사용자 조회
   */
  getUsersWithStatus: async () => {
    try {
      const response = await apiHelper.get(`${endpoints.users.list}/with-status`);
      return response;
    } catch (error) {
      handleApiError(error, '상태 메시지 사용자를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 최근 활동한 사용자 조회
   */
  getRecentlyActiveUsers: async (days = 7) => {
    try {
      const response = await apiHelper.get(`${endpoints.users.list}/recent`, { days });
      return response;
    } catch (error) {
      handleApiError(error, '최근 활동 사용자를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트를 가진 사용자 조회
   */
  getUsersWithProjects: async () => {
    try {
      const response = await apiHelper.get(endpoints.users.withProjects);
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 보유 사용자를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 인증 (로그인)
   */
  authenticateUser: async (identifier) => {
    try {
      const response = await apiHelper.post(endpoints.auth.login, { identifier });
      
      if (response.success) {
        showSuccessMessage('로그인이 완료되었습니다.');
        // Store auth token if provided
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      }
      
      return response;
    } catch (error) {
      handleApiError(error, '로그인에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 통계 조회
   */
  getUserStats: async () => {
    try {
      const response = await apiHelper.get(endpoints.users.stats);
      return response;
    } catch (error) {
      handleApiError(error, '사용자 통계를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 기본 사용자 초기화 (개발용)
   */
  initializeDefaultUser: async () => {
    try {
      const response = await apiHelper.post(endpoints.users.init);
      return response;
    } catch (error) {
      handleApiError(error, '기본 사용자 초기화에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 로그아웃
   */
  logout: () => {
    try {
      localStorage.removeItem('authToken');
      showSuccessMessage('로그아웃되었습니다.');
      return { success: true };
    } catch (error) {
      handleApiError(error, '로그아웃 처리 중 오류가 발생했습니다.');
      throw error;
    }
  },

  /**
   * 현재 로그인된 사용자 정보 조회
   */
  getCurrentUser: () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return null;
      }
      
      // JWT 토큰 디코딩 (실제로는 더 안전한 방법 사용 권장)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('토큰 파싱 오류:', error);
      return null;
    }
  },

  /**
   * 프로필 아이콘 목록
   */
  getProfileIcons: () => {
    return [
      { icon: '😊', label: '기본' },
      { icon: '🚶‍♂️', label: '외출중' },
      { icon: '💼', label: '외근중' },
      { icon: '🏖️', label: '휴가' },
      { icon: '📅', label: '연차' },
      { icon: '💻', label: '업무중' },
      { icon: '👥', label: '회의중' },
      { icon: '☕', label: '휴식' },
      { icon: '🚀', label: '프로젝트' },
      { icon: '🔥', label: '열정' },
      { icon: '🎯', label: '집중' },
      { icon: '⚡', label: '에너지' }
    ];
  },

  /**
   * 사용자 역할 목록
   */
  getUserRoles: () => {
    return ['USER', 'ADMIN', 'MANAGER'];
  },

  /**
   * 사용자 데이터 검증
   */
  validateUserData: (userData) => {
    const errors = [];

    if (!userData.username || userData.username.trim().length === 0) {
      errors.push('사용자명은 필수입니다.');
    }

    if (userData.username && userData.username.length < 3) {
      errors.push('사용자명은 3자 이상이어야 합니다.');
    }

    if (userData.username && userData.username.length > 50) {
      errors.push('사용자명은 50자를 초과할 수 없습니다.');
    }

    if (!userData.email || userData.email.trim().length === 0) {
      errors.push('이메일은 필수입니다.');
    }

    if (userData.email && !isValidEmail(userData.email)) {
      errors.push('유효한 이메일 주소를 입력해주세요.');
    }

    if (!userData.displayName || userData.displayName.trim().length === 0) {
      errors.push('표시명은 필수입니다.');
    }

    if (userData.displayName && userData.displayName.length > 100) {
      errors.push('표시명은 100자를 초과할 수 없습니다.');
    }

    if (userData.statusMessage && userData.statusMessage.length > 255) {
      errors.push('상태 메시지는 255자를 초과할 수 없습니다.');
    }

    if (userData.role && !userService.getUserRoles().includes(userData.role)) {
      errors.push('유효하지 않은 역할입니다.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * 기본 사용자 데이터 생성
   */
  createDefaultUserData: () => {
    return {
      username: '',
      email: '',
      displayName: '',
      profileIcon: '😊',
      statusMessage: '',
      role: 'USER',
      isActive: true
    };
  },

  /**
   * 사용자 필터링
   */
  filterUsers: (users, filters) => {
    return users.filter(user => {
      // 역할 필터
      if (filters.role && user.role !== filters.role) {
        return false;
      }

      // 활성 상태 필터
      if (filters.isActive !== undefined && user.isActive !== filters.isActive) {
        return false;
      }

      // 검색어 필터
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const usernameMatch = user.username.toLowerCase().includes(searchLower);
        const displayNameMatch = user.displayName?.toLowerCase().includes(searchLower);
        const emailMatch = user.email.toLowerCase().includes(searchLower);
        const statusMatch = user.statusMessage?.toLowerCase().includes(searchLower);
        
        if (!usernameMatch && !displayNameMatch && !emailMatch && !statusMatch) {
          return false;
        }
      }

      // 프로젝트 보유 필터
      if (filters.hasProjects !== undefined) {
        const hasProjects = user.projectCount > 0;
        if (hasProjects !== filters.hasProjects) {
          return false;
        }
      }

      // 가입일 필터
      if (filters.dateFrom) {
        const userDate = new Date(user.createdAt);
        const fromDate = new Date(filters.dateFrom);
        if (userDate < fromDate) {
          return false;
        }
      }

      if (filters.dateTo) {
        const userDate = new Date(user.createdAt);
        const toDate = new Date(filters.dateTo);
        if (userDate > toDate) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * 사용자 정렬
   */
  sortUsers: (users, sortBy = 'createdAt', sortOrder = 'desc') => {
    return [...users].sort((a, b) => {
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

      // 숫자 필드 처리
      if (sortBy === 'projectCount') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  },

  /**
   * 사용자 권한 확인
   */
  hasPermission: (user, permission) => {
    if (!user) return false;

    const permissions = {
      'admin': ['ADMIN'],
      'manage_projects': ['ADMIN', 'MANAGER'],
      'create_projects': ['ADMIN', 'MANAGER', 'USER'],
      'view_stats': ['ADMIN', 'MANAGER'],
      'manage_users': ['ADMIN']
    };

    const requiredRoles = permissions[permission];
    return requiredRoles && requiredRoles.includes(user.role);
  },

  /**
   * 사용자 활동 상태 확인
   */
  isUserActive: (user) => {
    if (!user || !user.isActive) return false;

    // 최근 30일 내 활동 확인
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const lastActivity = new Date(user.updatedAt);
    return lastActivity > thirtyDaysAgo;
  }
};

// 헬퍼 함수들
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};