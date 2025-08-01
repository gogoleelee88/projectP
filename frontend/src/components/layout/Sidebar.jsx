import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useAppContext } from '../../App';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, projects } = useAppContext();
  const [showCollectView, setShowCollectView] = useState(false);

  // Check if current route matches
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // External link handler
  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <aside className="fixed left-0 top-16 w-64 bg-gray-50 flex flex-col border-r border-gray-300 h-[calc(100vh-64px)] overflow-hidden">
      {/* User Info Section */}
      <div className="p-5 flex items-center gap-3 bg-gray-50 border-b border-gray-300 flex-shrink-0">
        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
          ★
        </div>
        <span className="text-sm font-semibold text-gray-800">
          {currentUser?.displayName || 'LEES00'}
        </span>
      </div>

      {/* New Project Button */}
      <div className="p-5 flex-shrink-0">
        <button 
          className="flex items-center justify-center gap-2 w-full h-11 bg-gray-800 text-gray-100 border-0 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-900 transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          onClick={() => handleNavigation('/projects/create')}
        >
          <Plus size={16} />
          새 프로젝트
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {/* Main Navigation */}
        <div className="mb-8">
          <div 
            className={`flex items-center py-2 mb-1 text-sm cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded ${
              isActiveRoute('/dashboard') 
                ? 'bg-purple-100 px-2 text-purple-600 font-semibold' 
                : 'text-gray-800'
            }`}
            onClick={() => handleNavigation('/dashboard')}
          >
            대시보드
          </div>

          <div 
            className={`flex items-center py-2 mb-1 text-sm cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded ${
              isActiveRoute('/projects') 
                ? 'bg-purple-100 px-2 text-purple-600 font-semibold' 
                : 'text-gray-800'
            }`}
            onClick={() => handleNavigation('/projects')}
          >
            내 프로젝트
          </div>

          <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
            회사 공개 프로젝트
          </div>

          <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
            더보기
          </div>
        </div>

        {/* Collect View Section */}
        <div className="mb-8">
          <h3 
            className="font-semibold text-sm text-gray-800 mb-4 pl-0 cursor-pointer flex items-center justify-between hover:text-purple-600 transition-colors"
            onClick={() => setShowCollectView(!showCollectView)}
          >
            모아보기
            <span className={`transform transition-transform duration-200 ${showCollectView ? 'rotate-180' : 'rotate-0'}`}>
              {showCollectView ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </h3>
          
          {showCollectView && (
            <div className="space-y-1 animate-fadeIn">
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                전체 업무
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                간트차트
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                캘린더
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                파일함
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                북마크
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                나를 언급
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                내 게시물
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                임시저장
              </div>
              <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
                휴지통
              </div>
            </div>
          )}
        </div>

        {/* Recent Updates */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm text-gray-800 mb-4 pl-0">최근 업데이트</h3>
          
          {/* Default projects */}
          <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
            플로우 시작 가이드
          </div>
          <div className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded">
            [플로우] LeeS 전용 문의방
          </div>
          
          {/* User projects */}
          {projects.slice(0, 3).map((project) => (
            <div 
              key={project.id}
              className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded"
              onClick={() => handleNavigation('/projects')}
              title={project.description}
            >
              {project.title}
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-xs text-gray-500 italic py-2">
              프로젝트가 없습니다
            </div>
          )}
        </div>

        {/* Blog Links Section */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm text-gray-800 mb-4 pl-0">개발 블로그</h3>
          
          <div 
            className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded"
            onClick={() => handleExternalLink('https://velog.io/@lco2009d/%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%84%A4%EB%AA%85%ED%9A%8C-%EC%B0%B8%EC%84%9D-%ED%9B%84%EA%B8%B0%EA%BF%80')}
          >
            🤝 협업툴 관심 알아보기
          </div>
          
          <div 
            className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded"
            onClick={() => handleExternalLink('https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B02.-%ED%99%94%EC%83%81%ED%9A%8C%EC%9D%98')}
          >
            💻 화상채팅 개발일기
          </div>
          
          <div 
            className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded"
            onClick={() => handleExternalLink('https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0-3.-%ED%9A%8C%EC%9D%98-ai%EC%9A%94%EC%95%BD-%EB%B0%8F-%EC%97%85%EB%AC%B4-%EB%B6%84%EB%8B%B4')}
          >
            🤖 AI 회의요약 개발일기
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-800 mb-4 pl-0">빠른 작업</h3>
          
          <div 
            className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded"
            onClick={() => handleNavigation('/portfolio')}
          >
            📊 포트폴리오 보기
          </div>
          
          <div 
            className="flex items-center py-2 mb-1 text-sm text-gray-800 cursor-pointer transition-all hover:bg-purple-100 hover:px-2 hover:text-purple-600 rounded"
            onClick={() => handleNavigation('/projects/create')}
          >
            ➕ 프로젝트 생성
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div 
        className="mt-auto w-full h-10 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity relative group flex-shrink-0"
        title="저를 뽑아주세요!"
        onClick={() => handleExternalLink('https://velog.io/@lco2009d')}
      >
        <span className="group-hover:hidden">상위 5% 기업의 개발자 채용법</span>
        <span className="hidden group-hover:block">저를 뽑아주세요! 🙏</span>
      </div>
    </aside>
  );
};

export default Sidebar;