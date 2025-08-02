import React, { useState } from 'react';
import { X } from 'lucide-react';

const MaintenanceModal = ({ onClose }) => {
  const [noShowToday, setNoShowToday] = useState(false);

  const handleClose = () => {
    if (noShowToday) {
      // Store in localStorage to not show today
      const today = new Date().toDateString();
      localStorage.setItem('maintenanceModalHidden', today);
    }
    onClose();
  };

  const handleCheckboxChange = (e) => {
    setNoShowToday(e.target.checked);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-10 max-w-lg w-full mx-4 text-center relative animate-fadeIn">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleClose}
        >
          <X size={20} />
        </button>

        {/* Decorative Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">포트폴리오</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">서버 업데이트 안내</h2>
        </div>
        
        {/* Main Message */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg leading-relaxed">
            계속해서 기능 업데이트 중입니다.<br/>
            더 나은 서비스를 제공하기 위해 노력하고 있습니다.
          </p>
        </div>
        
        {/* Update Info */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 text-left">
          <div className="font-semibold text-gray-800 mb-4 text-center">
            📅 업데이트 기간: 2025.08.01(일) 10시~
          </div>
          <div className="text-sm text-gray-600 mb-6 text-center">
            업데이트 동안 포트폴리오에 기능이 추가됩니다.<br/>
            일부 기능이 동작하지 않아도 조금만 기다려주세요!
          </div>
          
          <div>
            <div className="text-purple-600 font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span>사용가능 기능들:</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>프로젝트 생성 및 관리</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>일정 관리 시스템</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>AI 협업툴 개발 일지 블로그 연동</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 font-bold">⭐</span>
                <span>검색 기능 (새로 추가!)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">🔄</span>
                <span>화상채팅 및 AI요약 업무 분담 (블로그 연동)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-2xl mb-2">🤝</div>
            <div className="font-semibold text-blue-800 text-sm">협업툴 전문성</div>
            <div className="text-xs text-blue-600 mt-1">Flow 기반 개발 경험</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="text-2xl mb-2">🤖</div>
            <div className="font-semibold text-purple-800 text-sm">AI 기술 활용</div>
            <div className="text-xs text-purple-600 mt-1">OpenAI API 통합</div>
          </div>
        </div>
        
        {/* Action Button */}
        <button 
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-full font-semibold mb-6 hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
          onClick={handleClose}
        >
          이제 포트폴리오 보기 →
        </button>
        
        {/* Don't Show Again Option */}
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
          <input 
            type="checkbox" 
            id="noShowToday" 
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            checked={noShowToday}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="noShowToday" className="cursor-pointer hover:text-gray-700 transition-colors">
            오늘 다시 보지 않기
          </label>
        </div>

        {/* Footer Message */}
        <div className="mt-6 text-xs text-gray-400">
          💡 이 프로젝트는 실제 협업툴 개발 경험을 바탕으로 제작되었습니다
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModal;