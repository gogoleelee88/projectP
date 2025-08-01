import { apiHelper, endpoints, handleApiError } from './api';

/**
 * 검색 관련 API 서비스
 * 통합 검색, 카테고리별 검색, 검색 통계 등을 처리
 */
export const searchService = {
  /**
   * 통합 검색 - 모든 항목 검색
   */
  searchAll: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.all, { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 프로젝트 전용 검색
   */
  searchProjects: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.projects, { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '프로젝트 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 사용자 전용 검색
   */
  searchUsers: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.users, { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '사용자 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 카테고리별 검색
   */
  searchByCategory: async (category, query) => {
    try {
      const response = await apiHelper.get(endpoints.search.byCategory(category), { q: query });
      return response;
    } catch (error) {
      handleApiError(error, `${category} 카테고리 검색에 실패했습니다.`);
      throw error;
    }
  },

  /**
   * 사용자별 개인화된 검색
   */
  searchForUser: async (query, userId) => {
    try {
      const response = await apiHelper.get(endpoints.search.forUser(userId), { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '개인화된 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 상태 메시지 검색
   */
  searchStatus: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.status, { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '상태 메시지 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 인기 검색어 조회
   */
  getPopularSearchTerms: async () => {
    try {
      const response = await apiHelper.get(endpoints.search.popular);
      return response;
    } catch (error) {
      handleApiError(error, '인기 검색어를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 검색 통계 조회
   */
  getSearchStats: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.stats, { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '검색 통계를 불러오는데 실패했습니다.');
      throw error;
    }
  },

  /**
   * 검색 제안 (자동완성)
   */
  getSuggestions: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.suggest, { q: query });
      return response;
    } catch (error) {
      // 제안 실패는 조용히 처리
      console.warn('검색 제안 실패:', error);
      return { success: false, data: [] };
    }
  },

  /**
   * 빠른 검색 (미리보기)
   */
  quickSearch: async (query) => {
    try {
      const response = await apiHelper.get(endpoints.search.quick, { q: query });
      return response;
    } catch (error) {
      handleApiError(error, '빠른 검색에 실패했습니다.');
      throw error;
    }
  },

  /**
   * 검색 히스토리 관리 (로컬 스토리지)
   */
  getSearchHistory: () => {
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('검색 히스토리 로드 실패:', error);
      return [];
    }
  },

  /**
   * 검색 히스토리에 추가
   */
  addToSearchHistory: (query) => {
    try {
      if (!query || query.trim().length === 0) return;

      const history = searchService.getSearchHistory();
      const cleanQuery = query.trim();

      // 중복 제거
      const filteredHistory = history.filter(item => item.query !== cleanQuery);

      // 새 검색어를 맨 앞에 추가
      const newHistory = [
        {
          query: cleanQuery,
          timestamp: new Date().toISOString(),
          count: 1
        },
        ...filteredHistory.slice(0, 19) // 최대 20개까지 유지
      ];

      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    } catch (error) {
      console.error('검색 히스토리 저장 실패:', error);
      return [];
    }
  },

  /**
   * 검색 히스토리 삭제
   */
  removeFromSearchHistory: (query) => {
    try {
      const history = searchService.getSearchHistory();
      const filteredHistory = history.filter(item => item.query !== query);
      localStorage.setItem('searchHistory', JSON.stringify(filteredHistory));
      return filteredHistory;
    } catch (error) {
      console.error('검색 히스토리 삭제 실패:', error);
      return searchService.getSearchHistory();
    }
  },

  /**
   * 검색 히스토리 전체 삭제
   */
  clearSearchHistory: () => {
    try {
      localStorage.removeItem('searchHistory');
      return [];
    } catch (error) {
      console.error('검색 히스토리 초기화 실패:', error);
      return [];
    }
  },

  /**
   * 검색 결과 필터링
   */
  filterSearchResults: (results, filters) => {
    return results.filter(result => {
      // 타입 필터
      if (filters.type && result.type !== filters.type) {
        return false;
      }

      // 카테고리 필터
      if (filters.category && result.category !== filters.category) {
        return false;
      }

      // 최소 점수 필터 (있다면)
      if (filters.minScore && result.score < filters.minScore) {
        return false;
      }

      return true;
    });
  },

  /**
   * 검색 결과 정렬
   */
  sortSearchResults: (results, sortBy = 'relevance') => {
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          // 타입별 우선순위: 프로젝트 > 메뉴 > 사용자 > 블로그
          const typeOrder = { '프로젝트': 1, '내 프로젝트': 1, '메뉴': 2, '사용자': 3, '블로그': 4, '상태': 5 };
          const aTypeOrder = typeOrder[a.type] || 6;
          const bTypeOrder = typeOrder[b.type] || 6;
          return aTypeOrder - bTypeOrder;

        case 'alphabetical':
          return a.title.localeCompare(b.title);

        case 'type':
          if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
          }
          return a.title.localeCompare(b.title);

        default:
          return 0;
      }
    });
  },

  /**
   * 검색 결과 그룹화
   */
  groupSearchResults: (results) => {
    const grouped = {};

    results.forEach(result => {
      const type = result.type;
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(result);
    });

    // 각 그룹 내에서 정렬
    Object.keys(grouped).forEach(type => {
      grouped[type] = searchService.sortSearchResults(grouped[type], 'alphabetical');
    });

    return grouped;
  },

  /**
   * 검색어 하이라이트
   */
  highlightSearchTerm: (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  },

  /**
   * 검색 결과 아이콘 가져오기
   */
  getResultIcon: (result) => {
    const iconMap = {
      '프로젝트': '📋',
      '내 프로젝트': '📋',
      '메뉴': '📱',
      '사용자': '👤',
      '상태': '💬',
      '블로그': '📝'
    };

    return result.icon || iconMap[result.type] || '🔗';
  },

  /**
   * 검색 결과 URL 처리
   */
  handleSearchResultClick: (result, navigate) => {
    // 검색 히스토리에 추가하지 않음 (클릭은 검색이 아니므로)
    
    if (result.url) {
      if (result.url.startsWith('http')) {
        // 외부 URL
        window.open(result.url, '_blank');
      } else {
        // 내부 라우트
        navigate(result.url);
      }
    } else if (result.type === '프로젝트' || result.type === '내 프로젝트') {
      navigate('/projects');
    } else if (result.type === '메뉴') {
      // 메뉴별 라우팅 처리
      const menuRoutes = {
        '대시보드': '/dashboard',
        '내 프로젝트': '/projects',
        '프로젝트 생성': '/projects/create',
        '협업툴 관심력': '/portfolio'
      };
      
      const route = menuRoutes[result.title];
      if (route) {
        navigate(route);
      }
    } else if (result.type === '사용자') {
      // 사용자 프로필 페이지로 이동 (구현된 경우)
      // navigate(`/users/${result.id}`);
      console.log('사용자 프로필 페이지 이동:', result);
    }
  },

  /**
   * 검색 분석 데이터
   */
  getSearchAnalytics: () => {
    try {
      const history = searchService.getSearchHistory();
      
      // 가장 많이 검색된 키워드
      const queryCounts = {};
      history.forEach(item => {
        queryCounts[item.query] = (queryCounts[item.query] || 0) + (item.count || 1);
      });

      const topQueries = Object.entries(queryCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([query, count]) => ({ query, count }));

      // 검색 트렌드 (최근 7일)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentSearches = history.filter(item => 
        new Date(item.timestamp) > sevenDaysAgo
      );

      return {
        totalSearches: history.length,
        recentSearches: recentSearches.length,
        topQueries,
        lastSearched: history.length > 0 ? history[0].timestamp : null
      };
    } catch (error) {
      console.error('검색 분석 데이터 생성 실패:', error);
      return {
        totalSearches: 0,
        recentSearches: 0,
        topQueries: [],
        lastSearched: null
      };
    }
  },

  /**
   * 검색어 검증
   */
  validateSearchQuery: (query) => {
    const errors = [];

    if (!query || query.trim().length === 0) {
      errors.push('검색어를 입력해주세요.');
    }

    if (query && query.length > 100) {
      errors.push('검색어는 100자를 초과할 수 없습니다.');
    }

    // 특수문자만 있는 경우
    if (query && /^[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(query)) {
      errors.push('유효한 검색어를 입력해주세요.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};