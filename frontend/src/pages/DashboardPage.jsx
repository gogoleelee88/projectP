import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import StatusEditModal from '../components/modals/StatusEditModal';
import TaskWidget from '../components/dashboard/TaskWidget';
import NotificationWidget from '../components/dashboard/NotificationWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import ChatWidget from '../components/dashboard/ChatWidget';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser, projects, updateUserStatus } = useAppContext();
  
  // State for user status
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const [selectedStatusIcon, setSelectedStatusIcon] = useState('😊');
  const [profileStatus, setProfileStatus] = useState('');
  
  // State for promotional widget
  const [currentWidget, setCurrentWidget] = useState(0);

  // Widget items for the promotional banner
  const widgetItems = [
    {
      icon: '🤝',
      title: '협업툴에 대한 관심 알아보러 가기 클릭',
      url: 'https://velog.io/@lco2009d/%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%84%A4%EB%AA%85%ED%9A%8C-%EC%B0%B8%EC%84%9D-%ED%9B%84%EA%B8%B0%EA%BF%80'
    },
    {
      icon: '💻',
      title: '웹소켓 이용 화상채팅 개발일기 보러가기',
      url: 'https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B02.-%ED%99%94%EC%83%81%ED%9A%8C%EC%9D%98'
    },
    {
      icon: '🤖',
      title: 'AI 회의요약 및 녹취록 개발일기 보러가기',
      url: 'https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0-3.-%ED%9A%8C%EC%9D%98-ai%EC%9A%94%EC%95%BD-%EB%B0%8F-%EC%97%85%EB%AC%B4-%EB%B6%84%EB%8B%B4'
    }
  ];

  // Initialize user status
  useEffect(() => {
    if (currentUser) {
      setSelectedStatusIcon(currentUser.profileIcon || '😊');
      setProfileStatus(currentUser.statusMessage || '');
    }
  }, [currentUser]);

  // Auto-rotate promotional widget
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWidget((prev) => (prev + 1) % widgetItems.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [widgetItems.length]);

  // Handle status update
  const handleStatusUpdate = async (icon, message) => {
    try {
      await updateUserStatus(icon, message);
      setSelectedStatusIcon(icon);
      setProfileStatus(message);
      setShowStatusEdit(false);
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden m-0 p-0 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            안녕하세요, {currentUser?.displayName || 'LEES00'}님! 👋
          </h1>
          
          {/* User Status */}
          <div className="relative">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-white hover:bg-opacity-50 p-3 rounded-lg transition-all w-fit backdrop-blur-sm"
              onClick={() => setShowStatusEdit(!showStatusEdit)}
              title="상태 메시지 편집"
            >
              <span className="text-2xl">{selectedStatusIcon}</span>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-700">
                  {profileStatus || "프로필 상태메시지를 써보세요"}
                </span>
                <span className="text-sm text-gray-500">클릭하여 편집</span>
              </div>
              <span className="text-gray-400 hover:text-gray-600 transition-colors">✏️</span>
            </div>
          </div>
        </div>

        {/* Promotional Widget */}
        <div 
          className="w-full max-w-5xl rounded-2xl p-8 mb-12 shadow-xl flex items-center gap-8 cursor-pointer hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
          style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
          onClick={() => handleExternalLink(widgetItems[currentWidget].url)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
          </div>
          
          {/* Icon */}
          <div 
            key={`icon-${currentWidget}`}
            className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse shadow-2xl z-10"
          >
            <span className="text-3xl">{widgetItems[currentWidget].icon}</span>
          </div>
          
          {/* Text Content */}
          <div className="flex-1 relative z-10">
            <div className="text-white text-2xl font-bold mb-4">
              AI 화상 채팅 업무 분담 서비스 제작기 보러가기
            </div>
            
            <div 
              key={`text-${currentWidget}`}
              className="text-white text-opacity-90 text-lg animate-fadeIn"
            >
              {widgetItems[currentWidget].title}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 flex-shrink-0 relative z-10">
            <button 
              className="px-6 py-3 text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentWidget((prev) => (prev + 1) % widgetItems.length);
              }}
            >
              다음
            </button>
            <button className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-opacity-30 transition-all duration-200 font-semibold">
              보러가기 →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          <QuickActionCard
            icon="📁"
            title="내 프로젝트"
            onClick={() => handleNavigation('/projects')}
          />
          <QuickActionCard
            icon="📊"
            title="협업툴 관심력"
            onClick={() => handleNavigation('/portfolio')}
          />
          <QuickActionCard
            icon="📈"
            title="화상회의"
            onClick={() => handleExternalLink('https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B02.-%ED%99%94%EC%83%81%ED%9A%8C%EC%9D%98')}
          />
          <QuickActionCard
            icon="💬"
            title="회의 AI 업무분담"
            onClick={() => handleExternalLink('https://velog.io/@lco2009d/%ED%98%91%EC%97%85%ED%88%B4-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0-3.-%ED%9A%8C%EC%9D%98-ai%EC%9A%94%EC%95%BD-%EB%B0%8F-%EC%97%85%EB%AC%B4-%EB%B6%84%EB%8B%B4')}
          />
          <QuickActionCard
            icon="📋"
            title="작업"
            onClick={() => console.log('작업 관리')}
          />
          <QuickActionCard
            icon="📅"
            title="일정"
            onClick={() => console.log('일정 관리')}
          />
          <QuickActionCard
            icon="📁"
            title="파일"
            onClick={() => console.log('파일 관리')}
          />
          <QuickActionCard
            icon="➕"
            title="추가"
            onClick={() => handleNavigation('/projects/create')}
            variant="dashed"
          />
        </div>

        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Widget */}
          <TaskWidget projects={projects} />
          
          {/* Notification Widget */}
          <NotificationWidget projects={projects} />
          
          {/* Calendar Widget */}
          <CalendarWidget />
          
          {/* Chat Widget */}
          <ChatWidget />
        </div>

        {/* Additional Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Mentions Widget */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">언급</h3>
              <div className="w-2 h-6 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
            </div>
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-6xl opacity-20 mb-4">@</div>
              <div className="text-gray-500">나를 언급한 글이 없습니다.</div>
            </div>
          </div>

          {/* Add Widget Placeholder */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-dashed border-gray-200">
            <div 
              className="flex flex-col items-center justify-center h-full text-center cursor-pointer hover:border-purple-300 hover:text-purple-600 transition-all"
              onClick={() => console.log('새 위젯 추가')}
            >
              <div className="text-6xl opacity-20 mb-4">➕</div>
              <div className="text-gray-500 hover:text-purple-600 transition-colors">새 위젯 추가</div>
            </div>
          </div>
        </div>

        {/* Status Edit Modal */}
        {showStatusEdit && (
          <StatusEditModal
            currentIcon={selectedStatusIcon}
            currentMessage={profileStatus}
            onSave={handleStatusUpdate}
            onClose={() => setShowStatusEdit(false)}
          />
        )}
      </div>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ icon, title, onClick, variant = 'solid' }) => {
  const baseClasses = "flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 min-h-[120px]";
  const solidClasses = "bg-white shadow-lg hover:shadow-xl";
  const dashedClasses = "border-2 border-dashed border-gray-300 bg-transparent hover:border-purple-400 hover:bg-purple-50";

  return (
    <div 
      className={`${baseClasses} ${variant === 'dashed' ? dashedClasses : solidClasses}`}
      onClick={onClick}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-sm font-medium text-gray-700 text-center leading-tight">{title}</div>
    </div>
  );
};

export default DashboardPage;