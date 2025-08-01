import React, { useState, useEffect, useRef } from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAppContext } from '../../App';
import { searchService } from '../../services/searchService';
import SearchResults from '../search/SearchResults';

const Header = () => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search with debouncing
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await searchService.searchAll(query);
        
        if (response.success) {
          setSearchResults(response.data);
          setShowSearchResults(true);
        } else {
          setSearchResults([]);
          setShowSearchResults(false);
        }
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
        setShowSearchResults(false);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce
  };

  const handleSearchFocus = () => {
    if (searchQuery && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchResultClick = (result) => {
    setShowSearchResults(false);
    setSearchQuery('');
    
    // Handle different types of search results
    if (result.url) {
      if (result.url.startsWith('http')) {
        // External URL
        window.open(result.url, '_blank');
      } else {
        // Internal route
        window.location.hash = result.url;
      }
    } else if (result.type === '프로젝트' || result.type === '내 프로젝트') {
      // Navigate to project
      window.location.hash = '/projects';
    } else if (result.type === '메뉴') {
      // Handle menu navigation based on title
      const menuRoutes = {
        '대시보드': '/dashboard',
        '내 프로젝트': '/projects',
        '프로젝트 생성': '/projects/create',
        '협업툴 관심력': '/portfolio'
      };
      
      const route = menuRoutes[result.title];
      if (route) {
        window.location.hash = route;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-5 z-50 shadow-sm border-b border-gray-200">
      {/* Left side - Search */}
      <div className="flex items-center gap-5">
        <div className="relative" ref={searchRef}>
          <input 
            type="text" 
            className="w-80 h-10 bg-white border border-black rounded-full px-5 shadow-sm text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all" 
            placeholder="프로젝트, 업무, 사람 검색..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleSearchFocus}
          />
          
          {/* Search Loading Indicator */}
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
              {searchResults.length > 0 ? (
                <SearchResults 
                  results={searchResults} 
                  onResultClick={handleSearchResultClick}
                  query={searchQuery}
                />
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  "{searchQuery}"에 대한 검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button 
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all relative group"
          title="알림"
          onClick={() => {
            // TODO: Implement notifications
            console.log('Notifications clicked');
          }}
        >
          <Bell size={16} />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            3
          </span>
        </button>

        {/* Settings */}
        <button 
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
          title="설정"
          onClick={() => {
            // TODO: Implement settings
            console.log('Settings clicked');
          }}
        >
          <Settings size={16} />
        </button>

        {/* User Profile Quick Access */}
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:bg-purple-700 transition-colors"
             title="프로필">
          ⭐
        </div>
      </div>
    </header>
  );
};

export default Header;